import { useState, useEffect, useMemo } from 'react';
import { getMe } from '../../../services/authService';
import { getMyRentals } from '../../../services/rentalService';
import { submitLicense, uploadLicenseImages, getMyLicense } from '../../../services/renterService';

/** Map a backend rental to the dashboard booking shape. */
function mapRental(r) {
  const status = (r.status ?? '').toLowerCase();
  return {
    id: `DS-${r.request_id}`,
    requestId: r.request_id,
    status,
    car: {
      name: r.car_title,
      postId: r.car_post_id ?? null,   // needed for review submission
      image: null,
      pricePerDay: null,
    },
    startDate: r.start_date,
    endDate: r.end_date,
    total: r.total_price,
    submittedAt: r.requested_at
      ? new Date(r.requested_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : '',
    location: '',
    pickup: { date: r.start_date, time: '' },
    dropoff: { date: r.end_date, time: '' },
  };
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
          stats: { totalTrips: 0, joinDate: new Date(meData.created_at).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }) },
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

  const filteredBookings = useMemo(() => {
    const STATUS_MAP = { accepted: 'upcoming', completed: 'completed', cancelled: 'cancelled', rented: 'rented' };
    return allRentals
      .filter((b) => {
        if (activeTab === 'all') return b.status !== 'pending';
        if (activeTab === 'pending') return false;
        if (activeTab === 'upcoming') return ['accepted', 'rented', 'upcoming'].includes(b.status);
        if (activeTab === 'completed') return b.status === 'completed';
        return true;
      });
  }, [allRentals, activeTab]);

  const pendingBookings = useMemo(() => {
    const apiPending = allRentals.filter((b) => b.status === 'pending');
    const sessionOnly = sessionPending.filter(
      (sp) => !apiPending.some((ap) => String(ap.requestId) === String(sp.requestId)),
    );
    if (activeTab === 'all' || activeTab === 'pending') {
      return [...apiPending, ...sessionOnly];
    }
    return [];
  }, [allRentals, sessionPending, activeTab]);

  const activeBooking = filteredBookings.find((b) => ['rented', 'accepted', 'upcoming'].includes(b.status)) ?? null;
  const completedBookings = filteredBookings.filter((b) => b.status === 'completed');

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
    user,
    isLoading,
    licenseStatus,
    activeTab,
    setActiveTab,
    activeBooking,
    completedBookings,
    pendingBookings,
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
