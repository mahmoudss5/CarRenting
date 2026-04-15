import { motion } from "framer-motion";
import { Users, Car, AlertCircle } from "lucide-react";
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

function TextLink({ label }) {
  return (
    <button className="font-body text-body-md text-primary font-semibold bg-transparent border-0 cursor-pointer hover:underline">
      {label}
    </button>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export default function AdminDashboard() {
  const { stats, verifications, users, carPosts, handlers, isLoading } = useAdminApproval();

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <AdminNavbar />

      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 px-8 lg:px-12 py-10 min-w-0">
          {isLoading && (
            <div className="flex items-center gap-3 mb-8 py-3 px-5 bg-surface-bright rounded-lg shadow-ambient w-fit">
              <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              <span className="font-body text-body-md text-on-surface/50">Loading dashboard…</span>
            </div>
          )}

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            {/* Page Header */}
            <motion.div variants={fadeUp} className="mb-8">
              <h1 className="font-display font-bold text-display-sm text-on-surface mb-2">
                Admin Approval Console
              </h1>
              <p className="font-body text-body-md text-on-surface/50 max-w-xl">
                Review and manage incoming platform requests to maintain the high
                standards of the DriveShare mobility fleet.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-5 mb-8">
              <StatCard
                label="Total Users"
                value={stats.totalUsers}
                trend="+12%"
                trendUp
                icon={() => <Users size={18} strokeWidth={1.8} />}
              />
              <StatCard
                label="Total Active Cars"
                value={stats.totalActiveCars}
                trend="+5.2%"
                trendUp
                icon={() => <Car size={18} strokeWidth={1.8} />}
              />
              <StatCard
                label="Pending Approvals"
                value={stats.pendingCount}
                badge="Requires Action"
                icon={() => <AlertCircle size={18} strokeWidth={1.8} />}
              />
            </motion.div>

            {/* Renter Verifications */}
            <motion.div variants={fadeUp}>
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
            </motion.div>

            {/* Manage Users */}
            <motion.div variants={fadeUp}>
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
            </motion.div>

            {/* Manage Car Posts */}
            <motion.div variants={fadeUp}>
              <SectionCard className="mb-10">
                <SectionHeader title="Manage Car Posts" />
                <CarPostsTable
                  carPosts={carPosts}
                  onApprove={handlers.approveCar}
                  onReject={handlers.rejectCar}
                />
              </SectionCard>
            </motion.div>
          </motion.div>
        </main>
      </div>

      <SiteFooter />
    </div>
  );
}
