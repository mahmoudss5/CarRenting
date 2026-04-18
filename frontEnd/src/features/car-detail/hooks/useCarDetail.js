import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getCarById } from '../../../services/carService';
import { createRental } from '../../../services/rentalService';
import { getMyLicense, submitLicense, uploadLicenseImages } from '../../../services/renterService';
import { getUser } from '../../../lib/auth';

const API_BASE_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:5000').replace(/\/+$/, '');

function calcDays(start, end) {
  if (!start || !end) return 1;
  const diff = (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24);
  return Math.max(1, Math.round(diff));
}

function buildInitials(name) {
  if (!name) return '??';
  return name.split(' ').filter(Boolean).map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

function today() {
  return new Date().toISOString().split('T')[0];
}

function plusDays(dateStr, n) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
}

function normalizeImageUrl(url) {
  if (!url) {
    console.log('[normalizeImageUrl - useCarDetail] URL is empty or null:', url);
    return null;
  }
  if (/^https?:\/\//i.test(url) || url.startsWith('data:') || url.startsWith('blob:')) {
    console.log('[normalizeImageUrl - useCarDetail] URL is absolute/data:', url);
    return url;
  }
  const computed = url.startsWith('/') ? `${API_BASE_URL}${url}` : `${API_BASE_URL}/${url}`;
  console.log(`[normalizeImageUrl - useCarDetail] Original: "${url}" -> Computed: "${computed}" (API_BASE_URL: ${API_BASE_URL})`);
  return computed;
}

function pickGalleryImages(images = []) {
  const urls = images
    .map((img) => normalizeImageUrl(img?.image_url))
    .filter(Boolean);
  return {
    primary: urls[0] ?? null,
    main: urls[0] ?? null,
    side1: urls[1] ?? urls[0] ?? null,
    side2: urls[2] ?? urls[1] ?? urls[0] ?? null,
  };
}

/** Map a backend car detail response to the UI shape. */
function mapCar(c) {
  const reviewList = (c.reviews ?? []).map((r) => ({
    renterName: r.renter_name,
    rating: r.rating,
    feedback: r.feedback,
    createdAt: r.created_at,
  }));
  const avgRating =
    reviewList.length > 0
      ? Math.round((reviewList.reduce((s, r) => s + r.rating, 0) / reviewList.length) * 10) / 10
      : 0;

  const gallery = pickGalleryImages(c.images ?? []);

  return {
    id: c.post_id,
    name: c.title,
    variant: c.model ?? '',
    year: c.year,
    carType: c.car_type,
    brand: c.brand,
    model: c.model,
    transmission: c.transmission,
    location: c.location,
    pricePerDay: Number(c.rental_price),
    rentalStatus: c.rental_status,
    approvalStatus: c.approval_status,
    ownerName: c.owner_name,
    description: c.description,
    availability: c.availability ?? [],
    reviews: reviewList,
    avgRating,
    reviewCount: reviewList.length,
    images: {
      main: gallery.main,
      side1: gallery.side1,
      side2: gallery.side2,
    },
    primaryImageUrl: gallery.primary,
    owner: {
      userId: c.owner_user_id,
      name: c.owner_name ?? '—',
      initials: buildInitials(c.owner_name),
      rating: avgRating > 0 ? avgRating : '—',
      reviews: reviewList.length,
    },
  };
}

export function useCarDetail() {
  const { carId } = useParams();

  const [car, setCar] = useState(null);
  const [isLoadingCar, setIsLoadingCar] = useState(true);
  const [carError, setCarError] = useState(null);

  const defaultStart = today();
  const defaultEnd   = plusDays(defaultStart, 3);

  const [startDate, setStartDate] = useState(defaultStart);
  const [endDate, setEndDate]     = useState(defaultEnd);
  const [location, setLocation]   = useState('');

  const [modalOpen, setModalOpen]       = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess]       = useState(false);
  const [submitError, setSubmitError]   = useState('');

  // License state
  const [hasLicense, setHasLicense]       = useState(null); // null = unknown (loading)
  const [licenseFront, setLicenseFront]   = useState(null);
  const [licenseBack, setLicenseBack]     = useState(null);
  const [licenseNumber, setLicenseNumber] = useState('');
  const [issuingCountry, setIssuingCountry] = useState('');
  const [expiryDate, setExpiryDate]       = useState('');

  // Load car data
  useEffect(() => {
    if (!carId) return;
    setIsLoadingCar(true);
    setCarError(null);
    getCarById(carId)
      .then((data) => {
        const mapped = mapCar(data);
        setCar(mapped);
        setLocation(mapped.location);
      })
      .catch(() => setCarError('Car not found or failed to load.'))
      .finally(() => setIsLoadingCar(false));
  }, [carId]);

  // Check if the logged-in renter already has a license record.
  // Only treat a 404 as "no license". Any other error (401, network, etc.)
  // leaves hasLicense=null so the modal shows a loading state until confirmed.
  useEffect(() => {
    if (!getUser()) {
      setHasLicense(false);
      return;
    }
    getMyLicense()
      .then(() => setHasLicense(true))
      .catch((err) => {
        const status = err?.response?.status;
        if (status === 404) {
          setHasLicense(false); // truly no license yet
        } else {
          // Unknown state — default to false so the form is shown.
          // handleConfirm will gracefully handle the "already submitted" case.
          setHasLicense(false);
        }
      });
  }, []);

  const pricing = useMemo(() => {
    if (!car) return { numDays: 0, subtotal: 0, serviceFee: 0, insurance: 0, total: 0 };
    const numDays    = calcDays(startDate, endDate);
    const subtotal   = numDays * car.pricePerDay;
    const serviceFee = Math.round(subtotal * 0.0662 * 100) / 100;
    const insurance  = 40 * numDays;
    const total      = Math.round((subtotal + serviceFee + insurance) * 100) / 100;
    return { numDays, subtotal, serviceFee, insurance, total };
  }, [startDate, endDate, car]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!getUser()) {
      setSubmitError('You must be logged in to rent a car.');
      setModalOpen(true);
      return;
    }
    setSubmitError('');
    setIsSuccess(false);
    setLicenseFront(null);
    setLicenseBack(null);
    setLicenseNumber('');
    setIssuingCountry('');
    setExpiryDate('');
    setModalOpen(true);
  };

  const handleConfirm = async () => {
    if (!car) return;
    setIsSubmitting(true);
    setSubmitError('');
    try {
      // Step 1 — if renter has no license record yet, create one first
      if (!hasLicense) {
        try {
          await submitLicense({ licenseNumber, issuingCountry, expiryDate });
          if (licenseFront && licenseBack) {
            await uploadLicenseImages({ frontImage: licenseFront, backImage: licenseBack });
          }
          setHasLicense(true);
        } catch (licErr) {
          // If the backend says the license already exists (e.g. previous partial attempt
          // or getMyLicense failed earlier due to auth), treat it as on-file and continue.
          const msg = (
            licErr?.response?.data?.message ??
            licErr?.response?.data?.error ??
            ''
          ).toLowerCase();
          if (/already|exist|submitted/i.test(msg)) {
            setHasLicense(true);
            // license is on file — safe to proceed to rental creation
          } else {
            throw licErr; // real error — surface it to the user
          }
        }
      }

      // Step 2 — create the rental request
      await createRental({ postId: car.id, startDate, endDate });

      setIsSuccess(true);

      const pending = JSON.parse(sessionStorage.getItem('ds_pending_rentals') || '[]');
      pending.unshift({
        id: `DS-${Date.now().toString().slice(-5)}`,
        status: 'pending',
        car: { name: car.name, image: car.primaryImageUrl ?? null, pricePerDay: car.pricePerDay },
        startDate,
        endDate,
        location,
        total: pricing.total,
        submittedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      });
      sessionStorage.setItem('ds_pending_rentals', JSON.stringify(pending));
    } catch (err) {
      const msg =
        err?.response?.data?.message ??
        err?.response?.data?.error ??
        'Failed to submit rental request. Please try again.';
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    if (!isSubmitting) {
      setModalOpen(false);
      setTimeout(() => { setIsSuccess(false); setSubmitError(''); }, 300);
    }
  };

  return {
    car,
    isLoadingCar,
    carError,
    booking: { startDate, endDate, location, ...pricing },
    handlers: { setStartDate, setEndDate, setLocation, handleSubmit },
    modal: {
      isOpen: modalOpen,
      isSubmitting,
      isSuccess,
      submitError,
      hasLicense,
      // Existing-license image upload
      licenseFront,
      licenseBack,
      onLicenseFrontChange: (e) => e.target.files?.[0] && setLicenseFront(e.target.files[0]),
      onLicenseBackChange:  (e) => e.target.files?.[0] && setLicenseBack(e.target.files[0]),
      // New-license form fields
      licenseNumber,
      issuingCountry,
      expiryDate,
      onLicenseNumberChange:   (e) => setLicenseNumber(e.target.value),
      onIssuingCountryChange:  (e) => setIssuingCountry(e.target.value),
      onExpiryDateChange:      (e) => setExpiryDate(e.target.value),
      onConfirm: handleConfirm,
      onClose: handleCloseModal,
    },
  };
}
