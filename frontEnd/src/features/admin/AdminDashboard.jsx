import Navbar from '../../shared/components/Navbar';
import StatCard from './components/StatCard';
import UsersTable from './components/UsersTable';
import CarPostsTable from './components/CarPostsTable';
import Footer from '../../shared/components/Footer';
import { useAdminState } from './hooks/useAdminState';

/**
 * Admin dashboard — purely compositional.
 * All state and handlers come from useAdminState.
 */
export default function AdminDashboard() {
  const { stats, pendingUsers, pendingCarPosts, handlers } = useAdminState();
  const { approveUser, rejectUser, approveCar, rejectCar } = handlers;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 px-10 py-10">
        <div className="max-w-6xl mx-auto">
          {/* Page header */}
          <div className="mb-10">
            <p className="font-inter text-label-sm font-bold tracking-[0.05em] uppercase text-on-surface/40 mb-2">
              Admin Console
            </p>
            <h1 className="font-manrope font-bold text-on-surface" style={{ fontSize: '2rem' }}>
              Approval Dashboard
            </h1>
            <p className="font-inter text-body-md text-on-surface/55 mt-2 max-w-xl">
              Review and manage incoming platform requests to maintain the high
              standards of the DriveShare mobility fleet.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-5 mb-10">
            <StatCard
              label="Total Users"
              value={stats.totalUsers}
              badge="+12%"
              badgeVariant="positive"
            />
            <StatCard
              label="Active Cars"
              value={stats.totalActiveCars}
              badge="+5.2%"
              badgeVariant="positive"
            />
            <StatCard
              label="Pending Approvals"
              value={stats.pendingCount}
              badge="Requires Action"
              badgeVariant="warning"
            />
          </div>

          {/* Tables */}
          <UsersTable
            users={pendingUsers}
            onApprove={approveUser}
            onReject={rejectUser}
          />
          <CarPostsTable
            carPosts={pendingCarPosts}
            onApprove={approveCar}
            onReject={rejectCar}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
