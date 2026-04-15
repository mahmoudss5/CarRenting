import { motion } from 'framer-motion';
import { Clock, Calendar, MapPin, Car } from 'lucide-react';

const fmt = (n) =>
  `$${Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/**
 * Card shown in the Pending section of the renter dashboard.
 * Displays a rental waiting for the owner's decision.
 */
export default function PendingBookingCard({ booking }) {
  const { id, car, startDate, endDate, location, total, submittedAt } = booking;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface-bright rounded-2xl overflow-hidden border border-amber-200/60"
      style={{ boxShadow: '0 4px 24px -6px rgba(217,119,6,0.12)' }}
    >
      {/* Amber top stripe */}
      <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg,#d97706,#f59e0b)' }} />

      <div className="p-5 flex gap-4">
        {/* Car thumbnail */}
        <div className="w-24 h-20 rounded-xl overflow-hidden shrink-0 bg-surface-mid">
          {car.image ? (
            <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Car size={22} className="text-on-surface/30" strokeWidth={1.6} />
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <p className="font-manrope font-bold text-base text-on-surface leading-tight truncate">
              {car.name}
            </p>
            {/* Pending badge */}
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide shrink-0"
              style={{ background: '#fef9c3', color: '#92400e' }}
            >
              <Clock size={11} /> Pending
            </span>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
            <span className="flex items-center gap-1 font-inter text-xs text-on-surface/55">
              <Calendar size={11} className="text-on-surface/35" />
              {startDate} → {endDate}
            </span>
            <span className="flex items-center gap-1 font-inter text-xs text-on-surface/55">
              <MapPin size={11} className="text-on-surface/35" />
              {location}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-inter text-label-sm text-on-surface/35 uppercase tracking-[0.04em]">
              Ref&nbsp;{id} · Submitted {submittedAt}
            </span>
            <span className="font-manrope font-extrabold text-lg text-primary">{fmt(total)}</span>
          </div>
        </div>
      </div>

      {/* Waiting-for-approval footer bar */}
      <div
        className="flex items-center gap-2 px-5 py-2.5 border-t border-amber-100 text-xs font-semibold text-amber-700"
        style={{ background: '#fffbeb' }}
      >
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
        Waiting for owner approval — no charge until accepted
      </div>
    </motion.div>
  );
}
