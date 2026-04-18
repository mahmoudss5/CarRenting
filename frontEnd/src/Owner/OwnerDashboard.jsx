import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Inbox, TrendingUp, Clock, CheckCircle2, Car, FileText,
  AlertCircle, ChevronRight, Activity, CalendarClock
} from "lucide-react";
import StatusChip from "../components/ui/StatusChip";
import OwnerPageLayout from "./components/OwnerPageLayout";
import RequestActionButtons from "./components/RequestActionButtons";
import LicenseVerificationModal from "./components/LicenseVerificationModal";
import useOwnerDashboard from "./hooks/useOwnerDashboard";

// ─── Animations ─────────────────────────────────────────────────────────────
const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

// ─── Metric Card ────────────────────────────────────────────────────────────
const METRIC_COLORS = {
  blue: "bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-blue-400",
  emerald: "bg-gradient-to-br from-emerald-400 to-teal-500 text-white border-emerald-400",
  amber: "bg-gradient-to-br from-amber-400 to-orange-500 text-white border-amber-400",
  violet: "bg-gradient-to-br from-violet-500 to-purple-600 text-white border-violet-400"
};

function MetricCard({ label, value, icon: Icon, trend, color }) {
  const c = METRIC_COLORS[color] || METRIC_COLORS.blue;
  return (
    <motion.article
      variants={fadeUp}
      className={`relative overflow-hidden rounded-3xl border p-6 shadow-[0_4px_15px_rgba(0,0,0,0.05)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group ${c}`}
    >
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white opacity-10 pointer-events-none group-hover:scale-125 transition-transform duration-500" />
      <div className="flex flex-col h-full justify-between gap-4 relative z-10">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <Icon size={20} className="text-white" strokeWidth={2} />
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-white/90 bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-sm">
            <Activity size={10} /> {trend}
          </span>
        </div>
        <div>
          <p className="font-display text-4xl font-extrabold text-white">{value}</p>
          <p className="font-body text-sm font-medium text-white/80 mt-1">{label}</p>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Subcomponents ──────────────────────────────────────────────────────────
function SectionShell({ title, description, icon: Icon, children }) {
  return (
    <section className="rounded-3xl bg-white border border-gray-100 p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col h-full">
      <div className="mb-6 flex items-start gap-4">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
          <Icon size={22} strokeWidth={2} />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-gray-900 leading-tight">{title}</h2>
          <p className="font-body text-sm text-gray-500 mt-1">{description}</p>
        </div>
      </div>
      <div className="flex-1 flex flex-col space-y-4">
        {children}
      </div>
    </section>
  );
}

function RequestRow({ request, onAccept, onReject, onVerifyLicense, onRejectLicense }) {
  const [isLicenseModalOpen, setLicenseModalOpen] = useState(false);
  const license = request.driverLicense;
  const isAcceptBlocked = license.status !== "verified";

  return (
    <>
      <article className="relative overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 p-5 hover:bg-white hover:shadow-md hover:border-gray-200 transition-all duration-300">
        <div className="flex flex-col gap-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-display text-lg font-bold text-gray-900">{request.renterName}</h3>
                <span className="font-body text-xs font-semibold text-gray-400 bg-gray-200 px-2 py-0.5 rounded-md">#{request.id}</span>
              </div>
              <p className="font-body text-sm text-gray-600">
                Wants to rent <Link to={`/renter-car-detail/${request.carPostId}`} className="text-gray-900 font-semibold hover:underline decoration-gray-300">{request.carName}</Link>
              </p>
              <div className="flex items-center gap-2 mt-2 font-body text-xs text-gray-500 font-medium">
                <CalendarClock size={12} />
                {request.dateRange} <span className="text-gray-300">•</span> {request.totalDays} days <span className="text-gray-300">•</span> ${request.totalPrice}
              </div>
            </div>
          </div>

          {/* License Widget */}
          <div className="rounded-xl bg-white border border-gray-100 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
               <div className={`w-10 h-10 rounded-full flex items-center justify-center ${license.status === 'verified' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                 <FileText size={18} strokeWidth={2} />
               </div>
               <div>
                  <p className="font-body text-xs uppercase tracking-wider font-bold text-gray-400 mb-0.5">Driver License</p>
                  <div className="flex items-center gap-2">
                     <span className="font-body text-sm font-semibold text-gray-900">{license.status === 'verified' ? 'Verified' : 'Pending Review'}</span>
                     {license.status === 'verified' && <CheckCircle2 size={14} className="text-emerald-500" />}
                  </div>
               </div>
            </div>
            <button
              onClick={() => setLicenseModalOpen(true)}
              className="text-sm font-semibold text-gray-600 bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Review License
            </button>
          </div>

          {/* Action Footer */}
          <div>
            <RequestActionButtons onAccept={onAccept} onReject={onReject} acceptDisabled={isAcceptBlocked} />
          </div>
        </div>
      </article>

      {isLicenseModalOpen && (
        <LicenseVerificationModal
          request={request}
          onClose={() => setLicenseModalOpen(false)}
          onVerify={onVerifyLicense}
          onReject={onRejectLicense}
        />
      )}
    </>
  );
}

function PastRequestRow({ request }) {
  return (
    <article className="flex items-center justify-between gap-4 rounded-2xl bg-gray-50 border border-gray-100 p-4 hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all">
      <div>
        <p className="font-display font-medium text-gray-900 text-sm">{request.renterName}</p>
        <p className="font-body text-xs text-gray-500 mt-0.5">
          {request.carName} • {request.dateRange}
        </p>
      </div>
      <StatusChip label={request.decision} variant={request.decision === "accepted" ? "verified" : "pending"} />
    </article>
  );
}

function PostApprovalCard({ post }) {
  return (
    <article className="flex items-center justify-between gap-4 rounded-2xl bg-gray-50 border border-gray-100 p-4 hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all">
      <div>
        <p className="font-display font-medium text-gray-900 text-sm">{post.carName}</p>
        <p className="font-body text-xs text-gray-500 mt-0.5">
          Submitted {post.submittedAt}
        </p>
      </div>
      <StatusChip label="In Review" variant="pending" />
    </article>
  );
}

const EmptySection = ({ title, message }) => (
  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
     <Inbox size={32} className="text-gray-300 mb-3" />
     <p className="font-display font-semibold text-gray-700">{title}</p>
     <p className="font-body text-xs text-gray-500 mt-1 max-w-[200px]">{message}</p>
  </div>
);

// ─── Main Dashboard ─────────────────────────────────────────────────────────
export default function OwnerDashboard() {
  const {
    newRequests,
    pastRequests,
    pendingPosts,
    summary,
    acceptRentalRequest,
    rejectRentalRequest,
    verifyLicense,
    rejectLicense,
  } = useOwnerDashboard();

  const metrics = [
    { label: "Active Listings", value: summary.totalActivePosts ?? 0, icon: Car, trend: "Live", color: "blue" },
    { label: "Incoming Requests", value: summary.newRequestCount, icon: Inbox, trend: "Needs Action", color: "amber" },
    { label: "Pending Approvals", value: summary.pendingApprovalCount, icon: Clock, trend: "Awaiting Admin", color: "emerald" },
    { label: "Decisions Made", value: summary.pastRequestCount, icon: TrendingUp, trend: "Historical", color: "violet" },
  ];

  return (
    <OwnerPageLayout>
      <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-[1400px] mx-auto py-8">
        
        {/* Header Section */}
        <div className="relative overflow-hidden flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 shadow-[0_8px_30px_rgba(20,184,166,0.2)]">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-white opacity-10 blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-sm">Inbox & Activity</h1>
            <p className="font-body text-white/80 mt-3 text-sm sm:text-base max-w-2xl leading-relaxed">Review incoming rental applications, manage pending listings, and track your historical business decisions.</p>
          </div>
          <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
            <Link to="/owner/home" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-teal-700 font-bold hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all text-sm">
              <Car size={16} strokeWidth={2.5} /> Fleet
            </Link>
          </div>
        </div>

        {/* Metrics Grid */}
        <motion.section variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {metrics.map((m, i) => (
            <MetricCard key={i} {...m} />
          ))}
        </motion.section>

        {/* Main Content Areas */}
        <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
          
          {/* Priority Column */}
          <div className="flex flex-col gap-6">
            <SectionShell title="Incoming Rental Requests" description="Action required on the following bookings" icon={AlertCircle}>
               {newRequests.length > 0 ? (
                 newRequests.map(req => (
                   <RequestRow 
                     key={req.id} 
                     request={req}
                     onAccept={() => acceptRentalRequest(req)}
                     onReject={() => rejectRentalRequest(req)}
                     onVerifyLicense={verifyLicense}
                     onRejectLicense={rejectLicense}
                   />
                 ))
               ) : (
                 <EmptySection title="All caught up" message="You have no pending rental requests at this time." />
               )}
            </SectionShell>
          </div>

          {/* Secondary Column */}
          <div className="flex flex-col gap-6">
            <SectionShell title="Pending Listings" description="Awaiting administrative approval" icon={Clock}>
               {pendingPosts.length > 0 ? (
                 pendingPosts.map(post => <PostApprovalCard key={post.id} post={post} />)
               ) : (
                 <EmptySection title="No pending posts" message="All your submitted car listings have been processed." />
               )}
            </SectionShell>

            <SectionShell title="Recent Decisions" description="Your latest accepted or rejected requests" icon={CheckCircle2}>
               {pastRequests.length > 0 ? (
                 pastRequests.slice(0, 5).map(req => <PastRequestRow key={req.id} request={req} />)
               ) : (
                 <EmptySection title="No history found" message="You haven't made any rental decisions yet." />
               )}
               {pastRequests.length > 5 && (
                 <button className="flex items-center justify-center gap-1 w-full py-3 mt-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">
                   View all history <ChevronRight size={16} />
                 </button>
               )}
            </SectionShell>
          </div>

        </motion.div>
      </motion.div>
    </OwnerPageLayout>
  );
}
