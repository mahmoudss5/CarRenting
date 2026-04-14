import { Link } from "react-router-dom";
import StatusChip from "../../components/ui/StatusChip";

function StarRating({ rating }) {
  return (
    <span className="flex items-center gap-1 font-body text-body-md font-semibold text-on-surface/80">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="#003d9b" stroke="none">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
      {rating.toFixed(1)}
    </span>
  );
}

function CardMeta({ icon, label }) {
  return (
    <span className="flex items-center gap-1.5 font-body text-label-sm uppercase tracking-[0.04em] text-on-surface/45">
      {icon}
      {label}
    </span>
  );
}

export default function MobilityCard({ car }) {
  const { name, type, price, range, seats, extra, rating, reviews, image } = car;

  const fallbackImage =
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&h=400&q=80";
  const imgSrc = image?.startsWith("http") ? image : fallbackImage;

  return (
    <article className="bg-surface-lowest rounded-card overflow-hidden shadow-ambient hover:shadow-deep transition-shadow duration-300 group">
      <div className="bg-surface-low h-48 overflow-hidden relative">
        <img
          src={imgSrc}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <StatusChip label={type} variant="featured" />
        </div>
      </div>

      <div className="bg-surface-high p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-display font-bold text-title-md text-on-surface">{name}</h3>
            <div className="flex items-center gap-1.5 mt-1">
              <StarRating rating={rating} />
              <span className="font-body text-label-sm text-on-surface/40">
                ({reviews} reviews)
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="font-display font-bold text-xl text-primary">${price}</span>
            <span className="font-body text-label-sm text-on-surface/40 block">per day</span>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-5">
          <CardMeta label={range} icon={
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
            </svg>
          } />
          <CardMeta label={seats} icon={
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
            </svg>
          } />
          <CardMeta label={extra} icon={
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          } />
        </div>

        <Link
          to="/signup"
          className="block w-full text-center py-2.5 rounded-md font-body font-semibold text-sm text-primary no-underline transition-all duration-200 hover:bg-primary hover:text-on-primary"
          style={{ background: "rgba(0,61,155,0.08)" }}
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
