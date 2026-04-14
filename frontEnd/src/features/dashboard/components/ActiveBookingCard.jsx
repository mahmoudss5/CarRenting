import StatusChip from '../../../shared/components/StatusChip';

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-on-surface/30" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function TicketIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
    </svg>
  );
}

/**
 * Full-width active/rented booking card — horizontal image + detail layout.
 */
export default function ActiveBookingCard({ booking }) {
  return (
    <div
      className="bg-surface rounded-xl p-5 flex gap-5 mb-6"
      style={{ boxShadow: '0 2px 16px rgba(20,27,44,0.06)' }}
    >
      {/* Car image */}
      <div className="relative w-44 flex-shrink-0 rounded-lg overflow-hidden bg-[#111] self-stretch min-h-[160px]">
        <img
          src={booking.car.image}
          alt={booking.car.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 left-2">
          <StatusChip label="Rented" variant="rented" />
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col">
        {/* Top row: name + price */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-manrope font-bold text-title-md text-on-surface">
              {booking.car.name}
            </h3>
            <p className="font-inter text-body-md text-on-surface/45 mt-0.5">
              {booking.location} · ID: #{booking.id}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-manrope font-bold text-primary text-[1.2rem]">
              ${booking.car.pricePerDay}/day
            </p>
            <p className="font-inter text-body-md text-on-surface/40">
              Total: ${booking.totalCost.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Dates row */}
        <div className="flex items-center gap-5 mt-4 flex-1">
          <div>
            <p className="font-inter text-label-sm font-bold tracking-[0.05em] uppercase text-on-surface/40 mb-1">
              Pickup
            </p>
            <p className="font-inter font-semibold text-[0.9rem] text-on-surface">
              {booking.pickup.date}, {booking.pickup.time}
            </p>
          </div>
          <ArrowIcon />
          <div>
            <p className="font-inter text-label-sm font-bold tracking-[0.05em] uppercase text-on-surface/40 mb-1">
              Dropoff
            </p>
            <p className="font-inter font-semibold text-[0.9rem] text-on-surface">
              {booking.dropoff.date}, {booking.dropoff.time}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <button className="flex-1 py-2.5 rounded-md font-inter text-[0.9rem] font-semibold text-on-surface/70 bg-surface-container-low hover:bg-surface-container transition-colors duration-200">
            Manage Trip
          </button>
          <button
            aria-label="View ticket"
            className="w-10 h-10 rounded-md bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface/50 transition-colors duration-200"
          >
            <TicketIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
