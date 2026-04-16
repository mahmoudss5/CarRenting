import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getCarById } from '../../../services/carService';
import { createRental } from '../../../services/rentalService';
import { uploadLicenseImages } from '../../../services/renterService';
import { getUser } from '../../../lib/auth';

function calcDays(start, end) {
  if (!start || !end) return 1;
  const diff = (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24);
  return Math.max(1, Math.round(diff));
}

function today() {
  return new Date().toISOString().split('T')[0];
}

function plusDays(dateStr, n) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
}

/** Map a backend car detail response to the UI shape. */
function mapCar(c) {
  return {
    id: c.post_id,
    name: c.title,
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
    reviews: (c.reviews ?? []).map((r) => ({
      renterName: r.renter_name,
      rating: r.rating,
      feedback: r.feedback,
      createdAt: r.created_at,
    })),
    images: [],
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

  const [licenseFront, setLicenseFront] = useState(null);
  const [licenseBack, setLicenseBack]   = useState(null);

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

  const pricing = useMemo(() => {
    if (!car) return { numDays: 0, subtotal: 0, serviceFee: 0, insurance: 0, total: 0 };
    const numDays   = calcDays(startDate, endDate);
    const subtotal  = numDays * car.pricePerDay;
    const serviceFee = Math.round(subtotal * 0.0662 * 100) / 100;
    const insurance  = 40 * numDays;
    const total      = Math.round((subtotal + serviceFee + insurance) * 100) / 100;
    return { numDays, subtotal, serviceFee, insurance, total };
  }, [startDate, endDate, car]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError('');
    setIsSuccess(false);
    setLicenseFront(null);
    setLicenseBack(null);
    setModalOpen(true);
  };

  const handleConfirm = async () => {
    if (!car) return;
    setIsSubmitting(true);
    setSubmitError('');
    try {
      await createRental({
        postId: car.id,
        startDate,
        endDate,
      });

      if (licenseFront && licenseBack) {
        try {
          await uploadLicenseImages({ frontImage: licenseFront, backImage: licenseBack });
        } catch {
          // License upload failure is non-fatal; rental was already created
        }
      }

      setIsSuccess(true);

      // Mirror the pending booking into sessionStorage for the dashboard
      const user = getUser();
      const pending = JSON.parse(sessionStorage.getItem('ds_pending_rentals') || '[]');
      pending.unshift({
        id: `DS-${Date.now().toString().slice(-5)}`,
        status: 'pending',
        car: { name: car.name, image: car.images?.[0] ?? null, pricePerDay: car.pricePerDay },
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
      licenseFront,
      licenseBack,
      onLicenseFrontChange: (e) => e.target.files?.[0] && setLicenseFront(e.target.files[0]),
      onLicenseBackChange:  (e) => e.target.files?.[0] && setLicenseBack(e.target.files[0]),
      onConfirm: handleConfirm,
      onClose: handleCloseModal,
    },
  };
}
