import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Fuel, Star, ArrowRight } from 'lucide-react';
import StatusChip from '../../../shared/components/StatusChip';

export default function ExploreCarCard({ car }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.22 }}
      className="rounded-xl overflow-hidden bg-surface-lowest border border-surface-dim shadow-ambient hover:shadow-deep flex flex-col"
    >
      {/* Image area */}
      <div className="relative bg-[#111] overflow-hidden h-[190px] group">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {car.chipLabel && (
          <div className="absolute top-3 right-3">
            <StatusChip label={car.chipLabel} variant={car.chipVariant} />
          </div>
        )}
      </div>

      {/* Details area */}
      <div className="bg-surface-lowest px-5 pt-4 pb-5 flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-on-surface/45">
            <Fuel size={11} strokeWidth={2} />
            <p className="font-body text-label-sm font-bold tracking-[0.05em] uppercase">
              {car.year} · {car.fuelType}
            </p>
          </div>
          <p className="font-body text-label-sm tracking-[0.05em] uppercase text-on-surface/40">
            Per day
          </p>
        </div>

        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-bold text-title-md text-on-surface leading-snug">
            {car.name}
          </h3>
          <span className="font-display font-extrabold text-[1.4rem] text-primary flex-shrink-0">
            ${car.pricePerDay}
          </span>
        </div>

        <Link
          to={`/renter-car-detail/${car.id}`}
          className="flex items-center justify-center gap-1.5 w-full text-center py-2.5 rounded-md font-body text-[0.875rem] font-semibold text-primary bg-primary/8 hover:bg-primary hover:text-white transition-all duration-200 no-underline group"
        >
          View Details
          <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.article>
  );
}
