import BookingTabs from './BookingTabs';
import ActiveBookingCard from './ActiveBookingCard';
import CompletedBookingCard from './CompletedBookingCard';
import PendingBookingCard from './PendingBookingCard';
import RejectedBookingCard from './RejectedBookingCard';

/**
 * Tab panels: pending, active trips, completed vs rejected (side-by-side on All Bookings).
 */
export default function BookingsGrid({
  activeTab,
  onTabChange,
  activeBookings = [],
  completedBookings,
  pendingBookings = [],
  rejectedBookings = [],
}) {
  const showPending = activeTab === 'all' || activeTab === 'pending';
  const showActive = activeTab === 'all' || activeTab === 'upcoming';
  /** On "All", completed and rejected share one row (two columns on large screens). */
  const showCompletedRejectedRow = activeTab === 'all';
  const showCompletedOnly = activeTab === 'completed';
  const showRejectedOnly = activeTab === 'rejected';

  const hasPending = showPending && pendingBookings.length > 0;
  const hasActive = showActive && activeBookings.length > 0;
  const hasCompleted = completedBookings.length > 0;
  const hasRejected = rejectedBookings.length > 0;

  const historyRowVisible = showCompletedRejectedRow && (hasCompleted || hasRejected);
  const completedStandalone = showCompletedOnly && hasCompleted;
  const rejectedStandalone = showRejectedOnly && hasRejected;

  const isEmpty =
    (activeTab === 'all' &&
      !hasPending &&
      !hasActive &&
      !historyRowVisible) ||
    (activeTab === 'pending' && !hasPending) ||
    (activeTab === 'upcoming' && !hasActive) ||
    (activeTab === 'completed' && !completedStandalone) ||
    (activeTab === 'rejected' && !rejectedStandalone);

  return (
    <section>
      <div className="mb-6">
        <h1
          className="font-manrope font-bold text-on-surface"
          style={{ fontSize: '2rem', letterSpacing: '-0.015em' }}
        >
          My Bookings
        </h1>
        <p className="font-inter text-body-md text-on-surface/50 mt-1">
          Manage your upcoming and previous road adventures.
        </p>
      </div>

      <BookingTabs
        activeTab={activeTab}
        onTabChange={onTabChange}
        pendingCount={pendingBookings.length}
        rejectedCount={rejectedBookings.length}
      />

      {hasPending && (
        <div className="mb-8">
          <h2 className="font-manrope font-bold text-base text-on-surface/60 uppercase tracking-[0.04em] mb-4">
            Pending Approval
          </h2>
          <div className="flex flex-col gap-4">
            {pendingBookings.map((b) => (
              <PendingBookingCard key={b.id} booking={b} />
            ))}
          </div>
        </div>
      )}

      {hasActive && (
        <div className="mb-8">
          <h2 className="font-manrope font-bold text-base text-on-surface/60 uppercase tracking-[0.04em] mb-4">
            {activeTab === 'upcoming' ? 'Upcoming' : 'Active trips'}
          </h2>
          <div className="flex flex-col gap-4">
            {activeBookings.map((b) => (
              <ActiveBookingCard key={b.id} booking={b} />
            ))}
          </div>
        </div>
      )}

      {historyRowVisible && (
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          <div className="min-w-0">
            {hasCompleted ? (
              <>
                <h2 className="font-manrope font-bold text-base text-on-surface/60 uppercase tracking-[0.04em] mb-4">
                  Completed
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {completedBookings.map((b) => (
                    <CompletedBookingCard key={b.id} booking={b} />
                  ))}
                </div>
              </>
            ) : (
              <div className="rounded-xl border border-dashed border-outline-variant/30 bg-surface-container-low/40 px-4 py-8 text-center">
                <p className="font-inter text-body-md text-on-surface/40">No completed trips yet</p>
              </div>
            )}
          </div>
          <div className="min-w-0">
            {hasRejected ? (
              <>
                <h2 className="font-manrope font-bold text-base text-on-surface/60 uppercase tracking-[0.04em] mb-4">
                  Rejected
                </h2>
                <div className="flex flex-col gap-4">
                  {rejectedBookings.map((b) => (
                    <RejectedBookingCard key={b.id} booking={b} />
                  ))}
                </div>
              </>
            ) : (
              <div className="rounded-xl border border-dashed border-outline-variant/30 bg-surface-container-low/40 px-4 py-8 text-center">
                <p className="font-inter text-body-md text-on-surface/40">No rejected requests</p>
              </div>
            )}
          </div>
        </div>
      )}

      {completedStandalone && (
        <div className="mb-8">
          <h2 className="font-manrope font-bold text-base text-on-surface/60 uppercase tracking-[0.04em] mb-4">
            Completed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {completedBookings.map((b) => (
              <CompletedBookingCard key={b.id} booking={b} />
            ))}
          </div>
        </div>
      )}

      {rejectedStandalone && (
        <div className="mb-8">
          <h2 className="font-manrope font-bold text-base text-on-surface/60 uppercase tracking-[0.04em] mb-4">
            Rejected
          </h2>
          <div className="flex flex-col gap-4">
            {rejectedBookings.map((b) => (
              <RejectedBookingCard key={b.id} booking={b} />
            ))}
          </div>
        </div>
      )}

      {isEmpty && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="font-manrope font-bold text-headline-sm text-on-surface/25 mb-2">
            No bookings yet
          </p>
          <p className="font-inter text-body-md text-on-surface/35">
            Start exploring to find your perfect ride.
          </p>
        </div>
      )}
    </section>
  );
}
