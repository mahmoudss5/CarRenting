import AdminNavbar from '../admin/components/AdminNavbar';
import Footer from '../../shared/components/Footer';
import DashboardSidebar from './components/DashboardSidebar';
import BookingsGrid from './components/BookingsGrid';
import { useDashboard } from './hooks/useDashboard';

/**
 * Dashboard page — purely compositional.
 * All state and derived data come from useDashboard.
 */
export default function DashboardPage() {
  const {
    user,
    activeTab,
    setActiveTab,
    activeBooking,
    completedBookings,
    licenseFile,
    handleFileChange,
    handleSubmitLicense,
    isSubmitting,
  } = useDashboard();

  const licenseProps = {
    licenseFile,
    onFileChange: handleFileChange,
    onSubmit: handleSubmitLicense,
    isSubmitting,
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AdminNavbar />

      <div className="flex-1 max-w-7xl mx-auto w-full px-10 py-10">
        <div className="grid grid-cols-[280px_1fr] gap-10">
          <DashboardSidebar user={user} licenseProps={licenseProps} />

          <BookingsGrid
            activeTab={activeTab}
            onTabChange={setActiveTab}
            activeBooking={activeBooking}
            completedBookings={completedBookings}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
