import PriceBreakdown from './PriceBreakdown';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import { SHADOW_AMBIENT } from '../../../design/tokens';
import { getUser } from '../../../lib/auth';

/**
 * Sticky right-column booking card.
 * Floats via ambient shadow — not a harsh border.
 */
export default function BookingCard({ car, booking, handlers }) {
  const { startDate, endDate, location, total } = booking;
  const { setStartDate, setEndDate, setLocation, handleSubmit } = handlers;
  
  const user = getUser();
  const isOwner = user && String(user.nameid) === String(car.owner?.userId);

  return (
    <div
      className="sticky bg-surface rounded-2xl p-6 flex flex-col gap-5"
      style={{
        top: '88px',
        boxShadow: SHADOW_AMBIENT,
      }}
    >
      {/* Price header */}
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline gap-1">
          <span className="font-manrope font-extrabold text-[2rem] text-on-surface">
            ${car.pricePerDay}
          </span>
          <span className="font-inter text-body-md text-on-surface/45">/day</span>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-label-sm font-bold tracking-[0.05em] uppercase bg-[#e6f4ea] text-[#1b5e20]">
          Instant Book
        </span>
      </div>

      {/* Dates */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <p className="font-inter text-label-sm font-bold tracking-[0.05em] uppercase text-on-surface/45 mb-3">
            Pickup &amp; Return
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="booking-start" className="font-inter text-label-sm tracking-[0.05em] uppercase text-on-surface/40 mb-1 block">
                Start
              </label>
              <input
                id="booking-start"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-md text-sm font-inter text-on-surface bg-surface-container-highest outline-none focus:ring-1 focus:ring-primary/20 transition-all duration-200"
              />
            </div>
            <div>
              <label htmlFor="booking-end" className="font-inter text-label-sm tracking-[0.05em] uppercase text-on-surface/40 mb-1 block">
                End
              </label>
              <input
                id="booking-end"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-md text-sm font-inter text-on-surface bg-surface-container-highest outline-none focus:ring-1 focus:ring-primary/20 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="booking-location" className="font-inter text-label-sm tracking-[0.05em] uppercase text-on-surface/40 mb-1 block">
            Location
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path fillRule="evenodd" d="M11.54 22.351c.07.04.15.06.22.06s.15-.02.22-.06C12.49 21.857 21 16.35 21 10a9 9 0 00-18 0c0 6.35 8.51 11.857 9.04 12.351zM12 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </span>
            <input
              id="booking-location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-md text-sm font-inter text-on-surface bg-surface-container-highest outline-none focus:ring-1 focus:ring-primary/20 transition-all duration-200"
            />
          </div>
        </div>

        {/* Price breakdown */}
        <PriceBreakdown booking={booking} />

        {/* CTA */}
        <PrimaryButton type="submit" size="lg" className="w-full justify-center" disabled={isOwner}>
          {isOwner ? "You own this car" : "Request Rental →"}
        </PrimaryButton>
      </form>

      {/* Notice */}
      <p className="font-inter text-label-sm text-center text-on-surface/35 tracking-[0.04em] uppercase -mt-2">
        No charge until owner accepts request
      </p>
    </div>
  );
}
