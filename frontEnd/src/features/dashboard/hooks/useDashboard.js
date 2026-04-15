import { useState, useMemo } from 'react';
import { CURRENT_USER, BOOKINGS, PENDING_BOOKINGS } from '../data/dashboardData';

/**
 * Manages all dashboard state: tab selection, booking filtering,
 * pending rentals (static + submitted this session), and license upload.
 */
export function useDashboard() {
  const [activeTab, setActiveTab] = useState('all');
  const [licenseFile, setLicenseFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Read any pending rentals the renter submitted this session
  const sessionPending = useMemo(() => {
    try {
      return JSON.parse(sessionStorage.getItem('ds_pending_rentals') || '[]');
    } catch {
      return [];
    }
  }, []);

  const allPending = useMemo(
    () => [...sessionPending, ...PENDING_BOOKINGS],
    [sessionPending],
  );

  const filteredBookings = useMemo(() => {
    if (activeTab === 'all') return BOOKINGS;
    if (activeTab === 'pending') return [];           // pending shown separately below
    if (activeTab === 'upcoming')
      return BOOKINGS.filter((b) => b.status === 'rented' || b.status === 'upcoming');
    return BOOKINGS.filter((b) => b.status === 'completed');
  }, [activeTab]);

  const activeBooking = filteredBookings.find(
    (b) => b.status === 'rented' || b.status === 'upcoming',
  ) ?? null;

  const completedBookings = filteredBookings.filter((b) => b.status === 'completed');

  const pendingBookings = activeTab === 'all' || activeTab === 'pending' ? allPending : [];

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) setLicenseFile(e.target.files[0]);
  };

  const handleSubmitLicense = (e) => {
    e.preventDefault();
    if (!licenseFile) return;
    setIsSubmitting(true);
    // TODO: connect to POST /api/renter/license/images
    setTimeout(() => {
      setIsSubmitting(false);
      console.log('License submitted:', licenseFile.name);
    }, 2000);
  };

  return {
    user: CURRENT_USER,
    activeTab,
    setActiveTab,
    activeBooking,
    completedBookings,
    pendingBookings,
    licenseFile,
    handleFileChange,
    handleSubmitLicense,
    isSubmitting,
  };
}
