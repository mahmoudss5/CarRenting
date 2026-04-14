import { Link } from "react-router-dom";
import StatusChip from "../components/ui/StatusChip";
import PrimaryButton from "../components/ui/PrimaryButton";
import OwnerPageLayout from "./components/OwnerPageLayout";
import RequestActionButtons from "./components/RequestActionButtons";
import { DASHBOARD_METRICS } from "./data/ownerDashboardData";
import useOwnerDashboard from "./hooks/useOwnerDashboard";

function TripCuratorHeader({ pendingApprovalCount, newRequestCount }) {
  return (
    <section className="relative overflow-hidden rounded-card bg-surface-low p-6 md:p-8">
      <div className="absolute -right-10 top-8 h-48 w-48 rounded-full bg-primary/10 blur-2xl" />
      <div className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-primary-container/20 blur-2xl" />
      <div className="glass-surface relative z-10 max-w-[760px] rounded-lg p-6 shadow-ambient">
        <p className="font-body text-label-sm uppercase text-primary">Trip Curator</p>
        <h1 className="mt-2 font-display text-display-sm text-on-surface md:text-display-lg">
          Curate every ride with confidence.
        </h1>
        <p className="mt-3 max-w-[56ch] font-body text-body-md text-on-surface/80">
          Review incoming rentals, track completed decisions, and monitor listing approvals in one editorial command center.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <StatusChip label={`${newRequestCount} new rental requests`} variant="pending" />
          <StatusChip label={`${pendingApprovalCount} posts pending admin review`} variant="featured" />
        </div>
        <div className="mt-5">
          <Link to="/owner/create-post" className="no-underline">
            <PrimaryButton fullWidth={false} className="px-6 py-2.5">
              Create New Listing
            </PrimaryButton>
          </Link>
        </div>
      </div>
    </section>
  );
}

function SectionShell({ title, action, children }) {
  return (
    <section className="rounded-card bg-surface-low p-6 md:p-7">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-headline-sm text-on-surface">{title}</h2>
        {action ? <span className="font-body text-body-md text-primary">{action}</span> : null}
      </div>
      {children}
    </section>
  );
}

function RequestRow({ request, onAccept, onReject }) {
  const license = request.driverLicense;
  const licenseVariant = license.status === "verified" ? "verified" : "pending";
  const isAcceptBlocked = license.status !== "verified";

  return (
    <article className="rounded-lg bg-surface-lowest p-4 md:p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-body text-title-md text-on-surface">{request.renterName}</p>
          <p className="font-body text-body-md text-on-surface/70">
            {request.carName} - {request.dateRange}
          </p>
          <p className="mt-1 font-body text-body-md text-on-surface/65">
            Pickup: {request.pickupLocation} • {request.totalDays} days
          </p>
        </div>
        <StatusChip label={`license ${license.status}`} variant={licenseVariant} />
      </div>

      <div className="mt-4 rounded-md bg-surface-high p-4">
        <p className="font-body text-label-sm uppercase text-on-surface/60">Driver License Verification</p>
        <p className="mt-1 font-body text-body-md text-on-surface/75">
          Number: {license.licenseNumber} • Submitted: {license.submittedAt} • Expires: {license.expiryDate}
        </p>
      </div>

      <div className="mt-4">
        <RequestActionButtons onAccept={onAccept} onReject={onReject} acceptDisabled={isAcceptBlocked} />
      </div>
    </article>
  );
}

function PastRequestRow({ request }) {
  return (
    <article className="flex items-center justify-between rounded-lg bg-surface-lowest p-4 md:p-5">
      <div>
        <p className="font-body text-title-md text-on-surface">{request.renterName}</p>
        <p className="font-body text-body-md text-on-surface/70">
          {request.carName} - {request.dateRange}
        </p>
      </div>
      <StatusChip label={request.decision} variant={request.decision === "accepted" ? "verified" : "pending"} />
    </article>
  );
}

function PostApprovalCard({ post }) {
  return (
    <article className="rounded-lg bg-surface-lowest p-5">
      <p className="font-body text-label-sm uppercase text-on-surface/60">Submitted {post.submittedAt}</p>
      <div className="mt-2 flex items-center justify-between gap-4">
        <div>
          <p className="font-body text-title-md text-on-surface">{post.carName}</p>
          <p className="font-body text-body-md text-on-surface/75">${post.pricePerDay} / day</p>
        </div>
        <StatusChip label="pending admin approval" variant="pending" />
      </div>
    </article>
  );
}

function MetricCard({ metric }) {
  return (
    <article className="rounded-lg bg-surface-bright p-5 shadow-ambient">
      <p className="font-body text-label-sm uppercase text-on-surface/60">{metric.trend}</p>
      <p className="mt-4 font-body text-label-sm uppercase text-on-surface/65">{metric.label}</p>
      <p className="mt-2 font-display text-display-sm text-on-surface">{metric.value}</p>
    </article>
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
  } = useOwnerDashboard();

  return (
    <OwnerPageLayout>
        <TripCuratorHeader
          pendingApprovalCount={summary.pendingApprovalCount}
          newRequestCount={summary.newRequestCount}
        />

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {DASHBOARD_METRICS.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-2">
          <SectionShell title="New Rental Requests" action="Respond quickly">
            <div className="space-y-4">
              {newRequests.map((request) => (
                <RequestRow
                  key={request.id}
                  request={request}
                  onAccept={() => acceptRentalRequest(request)}
                  onReject={() => rejectRentalRequest(request)}
                />
              ))}
            </div>
          </SectionShell>

          <SectionShell title="Pending Post Requests" action={`Awaiting admin (${pendingPosts.length})`}>
            <div className="space-y-4">
              {pendingPosts.map((post) => (
                <PostApprovalCard key={post.id} post={post} />
              ))}
            </div>
          </SectionShell>
        </section>

        <section className="mt-8 rounded-card bg-surface-dim px-6 py-8 md:px-7">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-headline-sm text-on-surface">Past Renting Decisions</h2>
            <p className="font-body text-body-md text-on-surface/75">{summary.pastRequestCount} archived decisions</p>
          </div>
          <div className="space-y-4">
            {pastRequests.map((request) => (
              <PastRequestRow key={request.id} request={request} />
            ))}
          </div>
        </section>
    </OwnerPageLayout>
  );
}
