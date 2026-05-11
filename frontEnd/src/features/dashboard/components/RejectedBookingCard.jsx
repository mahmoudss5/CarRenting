import { motion } from 'framer-motion';
import { XCircle, Calendar, Car } from 'lucide-react';

const fmt = (n) =>
  `$${Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/**
 * Rental request declined by the owner.
 */
export default function RejectedBookingCard({ booking }) {
  const { id, car, startDate, endDate, total, submittedAt, rejectionReason } = booking;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface-bright rounded-2xl overflow-hidden border border-red-200/70"
      style={{ boxShadow: '0 4px 24px -6px rgba(185,28,28,0.1)' }}
    >
      <div className="h-1 w-full bg-gradient-to-r from-red-600 to-red-400" />

      <div className="p-5 flex gap-4">
        <div className="w-24 h-20 rounded-xl overflow-hidden shrink-0 bg-surface-mid">
          {car.image ? (
            <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Car size={22} className="text-on-surface/30" strokeWidth={1.6} />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <p className="font-manrope font-bold text-base text-on-surface leading-tight truncate">
              {car.name}
            </p>
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide shrink-0 bg-red-50 text-red-800"
            >
              <XCircle size={11} /> Rejected
            </span>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1 mb-2">
            <span className="flex items-center gap-1 font-inter text-xs text-on-surface/55">
              <Calendar size={11} className="text-on-surface/35" />
              {startDate} → {endDate}
            </span>
          </div>

          {rejectionReason ? (
            <p className="font-inter text-xs text-on-surface/60 mb-2 line-clamp-3">
              <span className="font-semibold text-on-surface/70">Reason: </span>
              {rejectionReason}
            </p>
          ) : null}

          <div className="flex items-center justify-between">
            <span className="font-inter text-label-sm text-on-surface/35 uppercase tracking-[0.04em]">
              Ref&nbsp;{id} · Submitted {submittedAt}
            </span>
            <span className="font-manrope font-extrabold text-lg text-on-surface/50">{fmt(total)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 px-5 py-2.5 border-t border-red-100 text-xs font-semibold text-red-800/90 bg-red-50/80">
        This request was not approved — you were not charged.
      </div>
    </motion.div>
  );
}
