function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? 'text-amber-400' : 'text-on-surface/20'}
        >
          ★
        </span>
      ))}
    </div>
  );
}

/**
 * Single renter review — no border, uses vertical gap for separation.
 */
export default function ReviewCard({ review }) {
  return (
    <div className="py-5">
      <div className="flex items-center justify-between mb-3">
        <StarRating rating={review.rating} />
        <span className="font-inter text-label-sm text-on-surface/40">{review.date}</span>
      </div>

      <p className="font-inter text-body-md text-on-surface/70 leading-relaxed mb-4 italic">
        {review.text}
      </p>

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center font-inter font-bold text-xs text-on-surface/60">
          {review.initials}
        </div>
        <span className="font-inter text-[0.875rem] font-semibold text-on-surface">
          {review.author}
        </span>
      </div>
    </div>
  );
}
