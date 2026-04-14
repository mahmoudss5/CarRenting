import { useState } from 'react';
import { Link } from 'react-router-dom';
import StatusChip from '../../../shared/components/StatusChip';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import { SHADOW_CARD, SHADOW_CARD_HOVER } from '../../../design/tokens';

/**
 * Individual mobility card — no divider lines, tonal separation only.
 * Image area: surface-container-lowest bg.
 * Text area: surface-container-high bg.
 */
export default function CarCard({ car }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="rounded-lg overflow-hidden transition-transform duration-300 cursor-pointer"
      style={{
        boxShadow: hovered ? SHADOW_CARD_HOVER : SHADOW_CARD,
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
      <div className="relative bg-surface-container-lowest overflow-hidden h-48">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Status chip — overlaid top-right */}
        <div className="absolute top-3 right-3">
          <StatusChip label={car.type} variant={car.chipVariant} />
        </div>
      </div>

      {/* Text area — distinct surface layer */}
      <div className="bg-surface-container-high px-5 py-4">
        <div className="mb-1">
          <h3 className="font-manrope font-bold text-title-md text-on-surface">
            {car.name}
          </h3>
          <p className="font-inter text-label-sm tracking-[0.05em] uppercase text-on-surface/45 mt-0.5">
            {car.year} · {car.type}
          </p>
        </div>

        {/* Specs row */}
        <div className="flex gap-3 my-3">
          {car.specs.map((spec) => (
            <span
              key={spec}
              className="font-inter text-label-sm text-on-surface/55"
            >
              {spec}
            </span>
          ))}
        </div>

        {/* Price + CTA row */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="font-manrope font-bold text-[1.4rem] text-primary">
              ${car.pricePerDay}
            </span>
            <span className="font-inter text-label-sm text-on-surface/45 ml-1">
              /day
            </span>
          </div>

          <PrimaryButton to={`/cars/${car.id}`} size="sm">
            Browse Details
          </PrimaryButton>
        </div>
      </div>
    </article>
  );
}
