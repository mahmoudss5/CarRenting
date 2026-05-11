import { useState, useEffect, useMemo } from 'react';
import { getMe } from '../../../services/authService';
import { getMyRentals } from '../../../services/rentalService';
import { submitLicense, uploadLicenseImages, getMyLicense } from '../../../services/renterService';

const API_BASE_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:5000').replace(/\/+$/, '');

function normalizeImageUrl(url) {
  if (!url) return null;
  if (/^https?:\/\//i.test(url) || url.startsWith('data:') || url.startsWith('blob:')) return url;
  return url.startsWith('/') ? `${API_BASE_URL}${url}` : `${API_BASE_URL}/${url}`;
}

/** True when a sessionStorage pending row is the same rental as an API row (by id or legacy trip match). */
function sessionRowMatchesApiRental(sp, r) {
  if (sp.requestId != null && String(sp.requestId) !== '') {
    return String(r.requestId) === String(sp.requestId);
  }
  const norm = (d) => (d ?? '').toString().slice(0, 10);
  const sameDates =
    norm(r.startDate) === norm(sp.startDate) && norm(r.endDate) === norm(sp.endDate);
  const rName = (r.car?.name ?? '').trim().toLowerCase();
  const spName = (sp.car?.name ?? '').trim().toLowerCase();
  return sameDates && rName !== '' && rName === spName;
}

/** Map a backend rental to the dashboard booking shape. */
function mapRental(r) {
  const status = (r.status || '').toLowerCase();
  const imageUrl = r.carPrimaryImageUrl || r.car_primary_image_url;
  return {
    id: `DS-${r.requestId || r.request_id}`,
    requestId: r.requestId || r.request_id,
    status,
    car: {
      name: r.carTitle || r.car_title || "Unknown Car",
      postId: r.carPostId || r.car_post_id || null,
      image: normalizeImageUrl(imageUrl),
      pricePerDay: null,
    },
    startDate: r.startDate || r.start_date,
    endDate: r.endDate || r.end_date,
    total: r.totalPrice || r.total_price || 0,
    totalCost: r.totalPrice || r.total_price || 0, // Used by ActiveBookingCard
    submittedAt: (r.requestedAt || r.requested_at)
      ? new Date(r.requestedAt || r.requested_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : '',
    rejectionReason: r.rejectionReason || r.rejection_reason || '',
    location: '',
    pickup: { date: r.startDate || r.start_date, time: '' },
    dropoff: { date: r.endDate || r.end_date, time: '' },
    dates: formatBookingDates(r.startDate || r.start_date, r.endDate || r.end_date),
  };
}

function formatBookingDates(start, end) {
  const a = (start ?? '').toString().slice(0, 10);
  const b = (end ?? '').toString().slice(0, 10);
  if (!a && !b) return '';
  if (!a) return b;
  if (!b) return a;
  return `${a} → ${b}`;
}

export function useDashboard() {
  const [user, setUser] = useState(null);
  const [allRentals, setAllRentals] = useState([]);
  const [licenseStatus, setLicenseStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [activeTab, setActiveTab] = useState('all');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [issuingCountry, setIssuingCountry] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [licenseFront, setLicenseFront] = useState(null);
  const [licenseBack, setLicenseBack] = useState(null);
  const [isSubmittingLicense, setIsSubmittingLicense] = useState(false);
  const [licenseMessage, setLicenseMessage] = useState('');

  useEffect(() => {
    Promise.all([getMe(), getMyRentals(), getMyLicense().catch(() => null)])
      .then(([meData, rentalsData, licenseData]) => {
        setUser({
          name: meData.full_name,
          email: meData.email,
          role: meData.role,
          status: meData.status,
          initials: meData.full_name
            ? meData.full_name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
            : '??',
          tier: 'Renter',
          tierVariant: 'electric',
          stats: {
            totalTrips: 0,
            joinDate: new Date(meData.created_at).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
          },
          licenseStatus: licenseData?.verification_status?.toLowerCase() ?? 'none',
        });
        setAllRentals(Array.isArray(rentalsData) ? rentalsData.map(mapRental) : []);
        setLicenseStatus(licenseData?.verification_status?.toLowerCase() ?? null);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  // Also merge any session-pending rentals submitted via car detail page
  const sessionPending = useMemo(() => {
    try {
      return JSON.parse(sessionStorage.getItem('ds_pending_rentals') || '[]');
    } catch { return []; }
  }, []);

  /** Past end date → treat as completed history (backend keeps status "Accepted" until owner completes). */
  const bookingsWithEndedFlag = useMemo(() => {
    const now = new Date();
    return allRentals.map((b) => {
      const endDate = new Date(b.endDate);
      const endValid = !Number.isNaN(endDate.getTime());
      const pastEnd = endValid && endDate < now;
      const isEnded =
        b.status === 'completed' ||
        (pastEnd && (b.status === 'accepted' || b.status === 'rented'));
      return { ...b, isEnded };
    });
  }, [allRentals]);

  const filteredBookings = useMemo(() => {
    return bookingsWithEndedFlag.filter((b) => {
      if (activeTab === 'all') return b.status !== 'pending';
      if (activeTab === 'pending') return false;
      if (activeTab === 'upcoming') {
        return (
          (['accepted', 'upcoming'].includes(b.status) || b.status === 'rented') &&
          !b.isEnded
        );
      }
      if (activeTab === 'completed') return b.status === 'completed' || b.isEnded;
      if (activeTab === 'rejected') return b.status === 'rejected';
      return true;
    });
  }, [bookingsWithEndedFlag, activeTab]);

  const pendingBookings = useMemo(() => {
    const apiPending = allRentals.filter((b) => b.status === 'pending');
    // Drop session ghosts whenever the API already has that rental (any status), so accepted trips
    // do not stay under "Pending Approval". Legacy rows without requestId match by dates + car name.
    const sessionOnly = sessionPending.filter(
      (sp) => !allRentals.some((r) => sessionRowMatchesApiRental(sp, r)),
    );
    if (activeTab === 'all' || activeTab === 'pending') {
      return [...apiPending, ...sessionOnly];
    }
    return [];
  }, [allRentals, sessionPending, activeTab]);

  /** Owner-declined requests (shown under All Bookings). */
  const rejectedBookings = useMemo(
    () => allRentals.filter((b) => b.status === 'rejected'),
    [allRentals],
  );

  /** Trips that were approved: ongoing (accepted) or finished (completed). */
  const acceptedTripCount = useMemo(
    () => allRentals.filter((b) => b.status === 'accepted' || b.status === 'completed').length,
    [allRentals],
  );

  const userWithTripStats = useMemo(() => {
    if (!user) return null;
    return {
      ...user,
      stats: { ...user.stats, totalTrips: acceptedTripCount },
    };
  }, [user, acceptedTripCount]);

  const activeBookings = useMemo(
    () =>
      filteredBookings.filter(
        (b) =>
          (['accepted', 'upcoming'].includes(b.status) || b.status === 'rented') &&
          !b.isEnded,
      ),
    [filteredBookings],
  );

  const completedBookings = useMemo(
    () => filteredBookings.filter((b) => b.status === 'completed' || b.isEnded),
    [filteredBookings],
  );

  const handleSubmitLicense = async (e) => {
    e.preventDefault();
    setLicenseMessage('');
    if (!licenseNumber || !issuingCountry || !expiryDate) {
      setLicenseMessage('Please fill in all license fields.');
      return;
    }
    setIsSubmittingLicense(true);
    try {
      await submitLicense({ licenseNumber, issuingCountry, expiryDate });
      if (licenseFront && licenseBack) {
        await uploadLicenseImages({ frontImage: licenseFront, backImage: licenseBack });
      }
      setLicenseStatus('pending');
      setLicenseMessage('License submitted successfully. Awaiting admin verification.');
    } catch (err) {
      const msg = err?.response?.data?.message ?? err?.response?.data?.error ?? 'License submission failed.';
      setLicenseMessage(msg);
    } finally {
      setIsSubmittingLicense(false);
    }
  };

  return {
    user: userWithTripStats,
    isLoading,
    licenseStatus,
    activeTab,
    setActiveTab,
    activeBookings,
    completedBookings,
    pendingBookings,
    rejectedBookings,
    licenseForm: { licenseNumber, issuingCountry, expiryDate, licenseFront, licenseBack },
    setLicenseNumber,
    setIssuingCountry,
    setExpiryDate,
    setLicenseFront: (e) => e.target.files?.[0] && setLicenseFront(e.target.files[0]),
    setLicenseBack:  (e) => e.target.files?.[0] && setLicenseBack(e.target.files[0]),
    handleSubmitLicense,
    isSubmittingLicense,
    licenseMessage,
  };
}
