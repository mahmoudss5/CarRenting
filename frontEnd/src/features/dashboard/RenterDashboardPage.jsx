import Navbar from '../../shared/components/Navbar';
import Footer from '../../shared/components/Footer';
import DashboardSidebar from './components/DashboardSidebar';
import BookingsGrid from './components/BookingsGrid';
import { useDashboard } from './hooks/useDashboard';

/**
 * Dashboard page — purely compositional.
 * All state and derived data come from useDashboard.
 */
export default function RenterDashboardPage() {
  const {
    user,
    activeTab,
    setActiveTab,
    activeBooking,
    completedBookings,
    pendingBookings,
  } = useDashboard();

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto w-full px-10 py-10">
        <div className="grid grid-cols-[280px_1fr] gap-10">
          <DashboardSidebar user={user} />

          <BookingsGrid
            activeTab={activeTab}
            onTabChange={setActiveTab}
            activeBooking={activeBooking}
            completedBookings={completedBookings}
            pendingBookings={pendingBookings}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
