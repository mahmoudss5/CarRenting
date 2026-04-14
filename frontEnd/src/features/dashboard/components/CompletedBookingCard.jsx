import StatusChip from '../../../shared/components/StatusChip';
import PrimaryButton from '../../../shared/components/PrimaryButton';

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= rating ? 'text-amber-400' : 'text-on-surface/20'}>
          ★
        </span>
      ))}
    </div>
  );
}

function RatedFooter({ rating }) {
  return (
    <div className="mt-4">
      <p className="font-inter text-label-sm font-bold tracking-[0.05em] uppercase text-on-surface/40 mb-2">
        Your Rating
      </p>
      <div className="flex items-center gap-2">
        <StarRating rating={rating} />
        <span className="text-primary text-sm font-bold">✓</span>
      </div>
      <button className="mt-3 font-inter text-[0.875rem] font-semibold text-primary hover:underline transition-colors duration-200">
        Download Receipt
      </button>
    </div>
  );
}

function UnratedFooter() {
  return (
    <div className="mt-4">
      <p className="font-inter text-body-md text-on-surface/45 mb-3">
        How was your adventure?
      </p>
      <PrimaryButton size="sm" className="w-full justify-center">
        ★ Rate this Experience
      </PrimaryButton>
    </div>
  );
}

/**
 * Completed booking card — context-aware footer (rated vs unrated).
 */
export default function CompletedBookingCard({ booking }) {
  return (
    <div
      className="bg-surface rounded-xl overflow-hidden flex flex-col"
      style={{ boxShadow: '0 2px 12px rgba(20,27,44,0.06)' }}
    >
      {/* Image */}
      <div className="relative h-44 bg-[#111] flex-shrink-0">
        <img
          src={booking.car.image}
          alt={booking.car.name}
          className="w-full h-full object-cover opacity-90"
          loading="lazy"
        />
        <div className="absolute top-2 left-2">
          <StatusChip label="Completed" variant="completed" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-manrope font-bold text-title-md text-on-surface">
          {booking.car.name}
        </h3>
        <p className="font-inter text-body-md text-on-surface/45 mt-1">{booking.dates}</p>

        {booking.hasRating ? (
          <RatedFooter rating={booking.rating} />
        ) : (
          <UnratedFooter />
        )}
      </div>
    </div>
  );
}
