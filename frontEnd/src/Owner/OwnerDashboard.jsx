import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Plus, TrendingUp, Clock, CheckCircle2, Car, FileText,
  AlertCircle, ArrowRight
} from "lucide-react";
import StatusChip from "../components/ui/StatusChip";
import PrimaryButton from "../components/ui/PrimaryButton";
import OwnerPageLayout from "./components/OwnerPageLayout";
import RequestActionButtons from "./components/RequestActionButtons";
import LicenseVerificationModal from "./components/LicenseVerificationModal";
import useOwnerDashboard from "./hooks/useOwnerDashboard";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};
const stagger = {
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const METRIC_ICONS = [TrendingUp, Car, CheckCircle2];

function TripCuratorHeader({ pendingApprovalCount, newRequestCount }) {
  return (
    <motion.section
      variants={fadeUp}
      className="relative overflow-hidden rounded-2xl bg-surface-low border border-surface-dim p-6 md:p-8"
    >
      <div className="absolute -right-10 top-8 h-48 w-48 rounded-full bg-tertiary/25 blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-primary/30 blur-3xl pointer-events-none" />
      <div className="glass-surface relative z-10 max-w-[760px] rounded-xl p-6 shadow-ambient">
        <div className="flex items-center gap-2 mb-2">
          <LayoutIcon />
          <p className="font-body text-label-sm uppercase text-primary tracking-[0.05em]">Trip Curator</p>
        </div>
        <h1 className="mt-1 font-display text-display-sm text-on-surface md:text-display-lg">
          Curate every ride with confidence.
        </h1>
        <p className="mt-3 max-w-[56ch] font-body text-body-md text-on-surface/70 leading-relaxed">
          Review incoming rentals, track completed decisions, and monitor listing approvals in one editorial command center.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <StatusChip label={`${newRequestCount} new rental requests`} variant="pending" />
          <StatusChip label={`${pendingApprovalCount} posts pending admin review`} variant="featured" />
        </div>
        <div className="mt-5">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
            <Link to="/owner/create-post" className="no-underline">
              <PrimaryButton fullWidth={false} className="flex items-center gap-1.5 px-6 py-2.5">
                <Plus size={16} strokeWidth={2.2} />
                Create New Listing
              </PrimaryButton>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function LayoutIcon() {
  return <Car size={16} className="text-primary" strokeWidth={1.8} />;
}

function SectionShell({ title, action, icon: Icon, children }) {
  return (
    <section className="rounded-2xl bg-surface-low border border-surface-dim p-6 md:p-7">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {Icon && <Icon size={18} className="text-on-surface/50" strokeWidth={1.8} />}
          <h2 className="font-display text-headline-sm text-on-surface">{title}</h2>
        </div>
        {action && <span className="font-body text-body-md text-primary text-sm">{action}</span>}
      </div>
      {children}
    </section>
  );
}

function RequestRow({ request, onAccept, onReject, onVerifyLicense, onRejectLicense }) {
  const [isLicenseModalOpen, setLicenseModalOpen] = useState(false);
  const license = request.driverLicense;
  const licenseVariant = license.status === "verified" ? "verified" : "pending";
  const isAcceptBlocked = license.status !== "verified";

  return (
    <>
      <article className="relative overflow-hidden rounded-xl bg-surface-lowest border border-surface-dim p-4 md:p-5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-primary/30 transition-all duration-300">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-body text-title-md text-on-surface font-semibold">{request.renterName}</p>
            <p className="font-body text-body-md text-on-surface/65 mt-0.5">
              <Link to={`/renter-car-detail/${request.carPostId}`} className="text-primary hover:underline font-medium">{request.carName}</Link> · {request.dateRange}
            </p>
            <p className="mt-1 font-body text-body-md text-on-surface/55">
              Pickup: {request.pickupLocation} · {request.totalDays} days
            </p>
          </div>
          <StatusChip label={`license ${license.status}`} variant={licenseVariant} />
        </div>

        <div className="mt-4 rounded-lg bg-surface-high border border-surface-dim p-4">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <FileText size={12} className="text-on-surface/40" strokeWidth={1.8} />
              <p className="font-body text-label-sm uppercase text-on-surface/55">Driver License Verification</p>
            </div>
            <button
              onClick={() => setLicenseModalOpen(true)}
              className="text-primary font-body text-label-sm uppercase font-semibold hover:underline"
            >
              Review License
            </button>
          </div>
          <p className="font-body text-body-md text-on-surface/70">
            Number: {license.licenseNumber} · Submitted: {license.submittedAt} · Expires: {license.expiryDate}
          </p>
        </div>

        <div className="mt-4">
          <RequestActionButtons onAccept={onAccept} onReject={onReject} acceptDisabled={isAcceptBlocked} />
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
    <article className="flex items-center justify-between rounded-xl bg-surface-lowest border border-surface-dim p-4 md:p-5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.05)] hover:border-tertiary/30 transition-all duration-300">
      <div>
        <p className="font-body text-title-md text-on-surface font-medium">{request.renterName}</p>
        <p className="font-body text-body-md text-on-surface/60 mt-0.5">
          {request.carName} · {request.dateRange}
        </p>
      </div>
      <StatusChip label={request.decision} variant={request.decision === "accepted" ? "verified" : "pending"} />
    </article>
  );
}

function PostApprovalCard({ post }) {
  return (
    <article className="rounded-xl bg-surface-lowest border border-surface-dim p-5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.05)] hover:border-primary/30 transition-all duration-300">
      <div className="flex items-center gap-1.5 mb-2">
        <Clock size={12} className="text-on-surface/40" strokeWidth={1.8} />
        <p className="font-body text-label-sm uppercase text-on-surface/55">Submitted {post.submittedAt}</p>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-body text-title-md text-on-surface font-medium">{post.carName}</p>
          <p className="font-body text-body-md text-on-surface/65">${post.pricePerDay} / day</p>
        </div>
        <StatusChip label="pending admin approval" variant="pending" />
      </div>
    </article>
  );
}

function MetricCard({ metric, icon: Icon }) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -2 }}
      className="relative overflow-hidden rounded-xl bg-surface-bright border border-surface-dim p-5 shadow-ambient"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-tertiary opacity-80" />
      <div className="flex items-start justify-between mb-3">
        <p className="font-body text-label-sm uppercase text-on-surface/55">{metric.trend}</p>
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon size={15} className="text-primary" strokeWidth={1.8} />
        </div>
      </div>
      <p className="font-body text-label-sm uppercase text-on-surface/55 mb-1">{metric.label}</p>
      <p className="font-display text-display-sm text-on-surface">{metric.value}</p>
    </motion.article>
  );
}

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

  const liveMetrics = [
    { id: "active",   label: "Active Listings",   value: String(summary.totalActivePosts ?? 0), trend: "Approved & live" },
    { id: "pending",  label: "New Rental Requests", value: String(summary.newRequestCount),     trend: "Awaiting your response" },
    { id: "decisions",label: "Past Decisions",      value: String(summary.pastRequestCount),   trend: "Completed actions" },
  ];

  return (
    <OwnerPageLayout>
      <motion.div variants={stagger} initial="hidden" animate="show">
        <TripCuratorHeader
          pendingApprovalCount={summary.pendingApprovalCount}
          newRequestCount={summary.newRequestCount}
        />

        <motion.section variants={stagger} className="mt-8 grid gap-4 md:grid-cols-3">
          {liveMetrics.map((metric, i) => (
            <MetricCard key={metric.id} metric={metric} icon={METRIC_ICONS[i] || TrendingUp} />
          ))}
        </motion.section>

        <motion.section variants={fadeUp} className="mt-8 grid gap-6 xl:grid-cols-2">
          <SectionShell title="New Rental Requests" icon={AlertCircle} action="Respond quickly">
            <div className="space-y-4">
              {newRequests.map((request) => (
                <RequestRow
                  key={request.id}
                  request={request}
                  onAccept={() => acceptRentalRequest(request)}
                  onReject={() => rejectRentalRequest(request)}
                  onVerifyLicense={verifyLicense}
                  onRejectLicense={rejectLicense}
                />
              ))}
            </div>
          </SectionShell>

          <SectionShell title="Pending Post Requests" icon={Clock} action={`Awaiting admin (${pendingPosts.length})`}>
            <div className="space-y-4">
              {pendingPosts.map((post) => (
                <PostApprovalCard key={post.id} post={post} />
              ))}
            </div>
          </SectionShell>
        </motion.section>

        <motion.section
          variants={fadeUp}
          className="mt-8 rounded-2xl bg-surface-dim border border-surface-dim px-6 py-7 md:px-7"
        >
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-on-surface/50" strokeWidth={1.8} />
              <h2 className="font-display text-headline-sm text-on-surface">Past Renting Decisions</h2>
            </div>
            <p className="font-body text-body-md text-on-surface/55">{summary.pastRequestCount} archived</p>
          </div>
          <div className="space-y-3">
            {pastRequests.map((request) => (
              <PastRequestRow key={request.id} request={request} />
            ))}
          </div>
        </motion.section>
      </motion.div>
    </OwnerPageLayout>
  );
}
