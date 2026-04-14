import { useState, useMemo } from 'react';
import { CURRENT_USER, BOOKINGS } from '../data/dashboardData';

/**
 * Manages all dashboard state: tab selection, booking filtering, license upload.
 * Returns derived data — components never import raw data directly.
 */
export function useDashboard() {
  const [activeTab, setActiveTab] = useState('all');
  const [licenseFile, setLicenseFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredBookings = useMemo(() => {
    if (activeTab === 'all') return BOOKINGS;
    if (activeTab === 'upcoming')
      return BOOKINGS.filter((b) => b.status === 'rented' || b.status === 'upcoming');
    return BOOKINGS.filter((b) => b.status === 'completed');
  }, [activeTab]);

  const activeBooking = filteredBookings.find(
    (b) => b.status === 'rented' || b.status === 'upcoming'
  ) ?? null;

  const completedBookings = filteredBookings.filter((b) => b.status === 'completed');

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) setLicenseFile(e.target.files[0]);
  };

  const handleSubmitLicense = (e) => {
    e.preventDefault();
    if (!licenseFile) return;
    setIsSubmitting(true);
    // TODO: connect to document upload API
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
    licenseFile,
    handleFileChange,
    handleSubmitLicense,
    isSubmitting,
  };
}
