import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Star, Settings2, Car } from 'lucide-react';
import StatusChip from '../../../shared/components/StatusChip';

// Deterministic gradient per car — cycles through a small palette using the car id
const GRADIENTS = [
  'from-blue-600 to-blue-800',
  'from-slate-700 to-slate-900',
  'from-violet-600 to-violet-900',
  'from-emerald-600 to-teal-800',
  'from-orange-500 to-red-700',
  'from-sky-500 to-blue-700',
];

function ImagePlaceholder({ car }) {
  const initial = (car.brand?.[0] ?? car.name?.[0] ?? 'C').toUpperCase();
  const gradient = GRADIENTS[(car.id ?? 0) % GRADIENTS.length];
  return (
    <div className={`w-full h-full bg-gradient-to-br ${gradient} flex flex-col items-center justify-center gap-2`}>
      <Car size={32} className="text-white/30" strokeWidth={1.2} />
      <span className="font-display font-extrabold text-[2.5rem] text-white/20 leading-none select-none">
        {initial}
      </span>
    </div>
  );
}

export default function ExploreCarCard({ car }) {
  const hasImage = !!car.image;

  return (
    <motion.article
      whileHover={{ y: -5, boxShadow: '0 16px 48px rgba(15,23,42,0.14)' }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-[0_2px_16px_rgba(15,23,42,0.06)] flex flex-col group"
    >
      {/* ── Image / placeholder area ── */}
      <div className="relative overflow-hidden h-[200px] bg-slate-900">
        {hasImage ? (
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex'; }}
          />
        ) : null}
        {/* Always render placeholder; hidden when image loads successfully */}
        <div
          className="w-full h-full transition-transform duration-500 group-hover:scale-105"
          style={hasImage ? { display: 'none' } : {}}
        >
          <ImagePlaceholder car={car} />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none" />

        {/* Status chip */}
        {car.chipLabel && (
          <div className="absolute top-3 right-3">
            <StatusChip label={car.chipLabel} variant={car.chipVariant} />
          </div>
        )}

        {/* Year + transmission badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-sm px-3 py-1">
          <Settings2 size={10} className="text-blue-300" strokeWidth={2.5} />
          <p className="font-inter text-[0.7rem] font-semibold text-white tracking-wide">
            {car.year}{car.transmission ? ` · ${car.transmission}` : ''}
          </p>
        </div>

        {/* Rating badge (top-left) */}
        {car.averageRating > 0 && (
          <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-black/40 backdrop-blur-sm px-2.5 py-1">
            <Star size={9} className="text-amber-400 fill-amber-400" strokeWidth={2} />
            <span className="font-inter text-[0.7rem] font-semibold text-white">
              {car.averageRating.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {/* ── Details area ── */}
      <div className="px-5 pt-4 pb-5 flex flex-col gap-3 flex-1">
        {/* Name + price */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-display font-bold text-[1rem] text-slate-800 leading-snug truncate">
              {car.name}
            </h3>
            {car.brand && car.model && (
              <p className="font-inter text-[0.75rem] text-slate-400 mt-0.5">
                {car.brand} · {car.model}
              </p>
            )}
          </div>
          <div className="flex-shrink-0 text-right">
            <span className="font-display font-extrabold text-[1.35rem] text-blue-700 leading-none">
              ${car.pricePerDay}
            </span>
            <p className="font-inter text-[0.65rem] text-slate-400 tracking-wide uppercase mt-0.5">/ day</p>
          </div>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-3 flex-wrap">
          {car.location && (
            <div className="flex items-center gap-1 text-slate-400">
              <MapPin size={11} strokeWidth={2} />
              <span className="font-inter text-[0.75rem]">{car.location}</span>
            </div>
          )}
          {car.carType && (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 font-inter text-[0.7rem] font-medium text-slate-500">
              {car.carType}
            </span>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA */}
        <Link
          to={`/renter-car-detail/${car.id}`}
          className="flex items-center justify-center gap-1.5 w-full text-center py-2.5 rounded-xl font-inter text-[0.8375rem] font-semibold text-blue-700 bg-blue-50 border border-blue-100 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 no-underline group/btn"
        >
          View Details
          <ArrowRight
            size={13}
            className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
          />
        </Link>
      </div>
    </motion.article>
  );
}
