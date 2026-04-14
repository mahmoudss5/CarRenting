import BookingTabs from './BookingTabs';
import ActiveBookingCard from './ActiveBookingCard';
import CompletedBookingCard from './CompletedBookingCard';

/**
 * Right content area — tabs + active booking + completed grid.
 */
export default function BookingsGrid({
  activeTab,
  onTabChange,
  activeBooking,
  completedBookings,
}) {
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

      <BookingTabs activeTab={activeTab} onTabChange={onTabChange} />

      {/* Active/rented booking — full width */}
      {activeBooking && <ActiveBookingCard booking={activeBooking} />}

      {/* Completed bookings — 2-col grid */}
      {completedBookings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {completedBookings.map((b) => (
            <CompletedBookingCard key={b.id} booking={b} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!activeBooking && completedBookings.length === 0 && (
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
