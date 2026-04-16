import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ArrowRight, Zap } from 'lucide-react';
import StatusChip from '../../../shared/components/StatusChip';

export default function ExploreCarCard({ car }) {
  return (
    <motion.article
      whileHover={{ y: -5, boxShadow: '0 16px 48px rgba(15,23,42,0.14)' }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-[0_2px_16px_rgba(15,23,42,0.06)] flex flex-col group"
    >
      {/* Image area */}
      <div className="relative bg-slate-900 overflow-hidden h-[200px]">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent pointer-events-none" />

        {/* Status chip */}
        {car.chipLabel && (
          <div className="absolute top-3 right-3">
            <StatusChip label={car.chipLabel} variant={car.chipVariant} />
          </div>
        )}

        {/* Year + fuel badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-sm px-3 py-1">
          <Zap size={10} className="text-blue-300" strokeWidth={2.5} />
          <p className="font-inter text-[0.7rem] font-semibold text-white tracking-wide">
            {car.year} · {car.fuelType}
          </p>
        </div>
      </div>

      {/* Details area */}
      <div className="px-5 pt-4 pb-5 flex flex-col gap-3 flex-1">
        {/* Name + price */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-bold text-[1rem] text-slate-800 leading-snug">
            {car.name}
          </h3>
          <div className="flex-shrink-0 text-right">
            <span className="font-display font-extrabold text-[1.35rem] text-blue-700 leading-none">
              ${car.pricePerDay}
            </span>
            <p className="font-inter text-[0.65rem] text-slate-400 tracking-wide uppercase mt-0.5">/ day</p>
          </div>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-3">
          {car.location && (
            <div className="flex items-center gap-1 text-slate-400">
              <MapPin size={11} strokeWidth={2} />
              <span className="font-inter text-[0.75rem]">{car.location}</span>
            </div>
          )}
          {car.availableFrom && (
            <div className="flex items-center gap-1 text-slate-400">
              <Calendar size={11} strokeWidth={2} />
              <span className="font-inter text-[0.75rem]">{car.availableFrom}</span>
            </div>
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
