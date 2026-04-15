import BookingTabs from './BookingTabs';
import ActiveBookingCard from './ActiveBookingCard';
import CompletedBookingCard from './CompletedBookingCard';
import PendingBookingCard from './PendingBookingCard';

/**
 * Right content area — tabs + pending + active booking + completed grid.
 */
export default function BookingsGrid({
  activeTab,
  onTabChange,
  activeBooking,
  completedBookings,
  pendingBookings = [],
}) {
  const showPending   = activeTab === 'all' || activeTab === 'pending';
  const showActive    = activeTab === 'all' || activeTab === 'upcoming';
  const showCompleted = activeTab === 'all' || activeTab === 'completed';

  const isEmpty =
    (!showPending || pendingBookings.length === 0) &&
    (!showActive  || !activeBooking) &&
    (!showCompleted || completedBookings.length === 0);

  return (
    <section>
      {/* Page heading */}
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
      />

      {/* ── Pending Rentals ── */}
      {showPending && pendingBookings.length > 0 && (
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

      {/* ── Active / Rented booking ── */}
      {showActive && activeBooking && (
        <ActiveBookingCard booking={activeBooking} />
      )}

      {/* ── Completed bookings ── */}
      {showCompleted && completedBookings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {completedBookings.map((b) => (
            <CompletedBookingCard key={b.id} booking={b} />
          ))}
        </div>
      )}

      {/* ── Empty state ── */}
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
