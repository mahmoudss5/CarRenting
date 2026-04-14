import ReviewCard from './ReviewCard';

/**
 * Reviews section — aggregate rating summary + list of ReviewCards.
 * Uses 32px vertical gap (mt-8) instead of a divider above.
 */
export default function ReviewsSection({ reviews, avgRating, reviewCount }) {
  return (
    <section className="mt-8" aria-label="Renter Reviews">
      {/* Section header row */}
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-manrope font-bold text-headline-sm text-on-surface">
          Renter Reviews
        </h2>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-manrope font-extrabold text-[1.5rem] text-on-surface leading-none">
              {avgRating}
            </p>
            <p className="font-inter text-label-sm text-on-surface/40 uppercase tracking-[0.05em]">
              Avg Rating
            </p>
          </div>
          <div className="text-right">
            <p className="font-manrope font-extrabold text-[1.5rem] text-on-surface leading-none">
              {reviewCount}
            </p>
            <p className="font-inter text-label-sm text-on-surface/40 uppercase tracking-[0.05em]">
              Reviews
            </p>
          </div>
        </div>
      </div>

      {/* Review list — vertical gap separates cards, no dividers */}
      <div className="divide-y divide-outline-variant/15">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
}
