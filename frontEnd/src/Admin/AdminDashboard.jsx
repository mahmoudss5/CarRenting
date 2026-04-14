import { useAdminApproval } from "./hooks/useAdminApproval";
import AdminNavbar from "./components/AdminNavbar";
import AdminSidebar from "./components/AdminSidebar";
import StatCard from "./components/StatCard";
import SectionCard from "./components/SectionCard";
import SectionHeader from "./components/SectionHeader";
import VerificationsTable from "./components/VerificationsTable";
import UsersTable from "./components/UsersTable";
import CarPostsTable from "./components/CarPostsTable";
import SiteFooter from "../components/layout/SiteFooter";

// ─── Stat Icons ───────────────────────────────────────────────────────────────

function PeopleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function CarStatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 11l1.5-4.5a2 2 0 0 1 1.9-1.5h7.2a2 2 0 0 1 1.9 1.5L19 11" />
      <rect x="3" y="11" width="18" height="7" rx="1.5" />
      <circle cx="7.5" cy="18" r="1.5" /><circle cx="16.5" cy="18" r="1.5" />
    </svg>
  );
}

function AlertDotIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <line x1="9" y1="10" x2="9" y2="10" /><line x1="12" y1="10" x2="12" y2="10" /><line x1="15" y1="10" x2="15" y2="10" />
    </svg>
  );
}

// ─── Link-style button used in section headers ────────────────────────────────

function TextLink({ label }) {
  return (
    <button className="font-body text-body-md text-primary font-semibold bg-transparent border-0 cursor-pointer hover:underline">
      {label}
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const { stats, verifications, users, carPosts, handlers, isLoading } = useAdminApproval();

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <AdminNavbar />

      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 px-10 pr-16 py-10 min-w-0">
          {isLoading && (
            <div className="flex items-center gap-3 mb-8 py-3 px-5 bg-surface-bright rounded-lg shadow-ambient w-fit">
              <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              <span className="font-body text-body-md text-on-surface/50">Loading dashboard…</span>
            </div>
          )}

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-display font-bold text-display-sm text-on-surface mb-2">
              Admin Approval Console
            </h1>
            <p className="font-body text-body-md text-on-surface/50 max-w-xl">
              Review and manage incoming platform requests to maintain the high
              standards of the DriveShare mobility fleet.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-5 mb-8">
            <StatCard
              label="Total Users"
              value={stats.totalUsers}
              trend="+12%"
              trendUp
              icon={PeopleIcon}
            />
            <StatCard
              label="Total Active Cars"
              value={stats.totalActiveCars}
              trend="+5.2%"
              trendUp
              icon={CarStatIcon}
            />
            <StatCard
              label="Pending Approvals"
              value={stats.pendingCount}
              badge="Requires Action"
              icon={AlertDotIcon}
            />
          </div>

          {/* Renter Verifications */}
          <SectionCard className="mb-6">
            <SectionHeader
              title="Renter Verifications"
              badge={`${verifications.length} Pending`}
              right={<TextLink label="Verification Settings" />}
            />
            <VerificationsTable
              verifications={verifications}
              onApprove={handlers.approveVerification}
              onReject={handlers.rejectVerification}
            />
          </SectionCard>

          {/* Manage Users */}
          <SectionCard className="mb-6">
            <SectionHeader
              title="Manage Users"
              right={<TextLink label="View All Users" />}
            />
            <UsersTable
              users={users}
              onApprove={handlers.approveUser}
              onReject={handlers.rejectUser}
            />
          </SectionCard>

          {/* Manage Car Posts */}
          <SectionCard className="mb-10">
            <SectionHeader title="Manage Car Posts" />
            <CarPostsTable
              carPosts={carPosts}
              onApprove={handlers.approveCar}
              onReject={handlers.rejectCar}
            />
          </SectionCard>

        </main>
      </div>

      <SiteFooter />
    </div>
  );
}
