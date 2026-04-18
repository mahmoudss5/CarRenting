/**
 * Vehicle owner info card — surface-container-low background, no border.
 */
export default function OwnerCard({ owner }) {
  if (!owner) return null;

  return (
    <div className="mt-8 bg-surface-container-low rounded-xl p-5 flex items-center gap-4">
      {/* Avatar */}
      <div className="w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center font-manrope font-bold text-on-secondary-container text-lg flex-shrink-0">
        {owner.initials}
      </div>

      {/* Info */}
      <div className="flex-1">
        <p className="font-inter text-label-sm font-bold tracking-[0.05em] uppercase text-on-surface/40 mb-1">
          Vehicle Owner
        </p>
        <p className="font-manrope font-bold text-title-md text-on-surface">
          {owner.name}
        </p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-amber-400 text-sm">★</span>
          <span className="font-inter text-body-md font-semibold text-on-surface">
            {owner.rating}
          </span>
          <span className="font-inter text-body-md text-on-surface/45">
            · {owner.reviews} Reviews
          </span>
        </div>
      </div>

      {/* Action */}
      <button className="flex-shrink-0 px-5 py-2.5 rounded-md font-inter text-[0.875rem] font-semibold text-on-surface bg-surface-container hover:bg-surface-container-high transition-colors duration-200">
        Contact Owner
      </button>
    </div>
  );
}
