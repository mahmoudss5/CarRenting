import { useState } from 'react';
import { Link } from 'react-router-dom';
import StatusChip from '../../../shared/components/StatusChip';
import { SHADOW_CARD, SHADOW_CARD_HOVER } from '../../../design/tokens';

/**
 * Explore-page car card — matches the design screenshot layout:
 * large dark image → metadata row → name + price → View Details button.
 */
export default function ExploreCarCard({ car }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="rounded-lg overflow-hidden bg-surface flex flex-col"
      style={{
        boxShadow: hovered ? SHADOW_CARD_HOVER : SHADOW_CARD,
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
      <div className="relative bg-[#111] overflow-hidden h-[190px]">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover opacity-90"
          loading="lazy"
        />
        {/* Chip — top right of image */}
        {car.chipLabel && (
          <div className="absolute top-3 right-3">
            <StatusChip label={car.chipLabel} variant={car.chipVariant} />
          </div>
        )}
      </div>

      {/* Details area */}
      <div className="bg-surface px-5 pt-4 pb-5 flex flex-col gap-3 flex-1">
        {/* Metadata row */}
        <div className="flex items-center justify-between">
          <p className="font-inter text-label-sm font-bold tracking-[0.05em] uppercase text-on-surface/45">
            {car.year} · {car.fuelType}
          </p>
          <p className="font-inter text-label-sm tracking-[0.05em] uppercase text-on-surface/40">
            Per day
          </p>
        </div>

        {/* Name + Price row */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-manrope font-bold text-title-md text-on-surface leading-snug">
            {car.name}
          </h3>
          <span className="font-manrope font-extrabold text-[1.5rem] text-primary flex-shrink-0">
            ${car.pricePerDay}
          </span>
        </div>

        {/* View Details — secondary style, not gradient */}
        <Link
          to={`/renter-car-detail/${car.id}`}
          className="w-full text-center py-2.5 rounded-md font-inter text-[0.875rem] font-semibold text-primary bg-secondary-container hover:bg-primary hover:text-white transition-all duration-200"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
