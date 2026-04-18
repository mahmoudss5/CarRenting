import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  X, Upload, CheckCircle2, Clock, Car, Calendar, MapPin,
  FileText, ShieldCheck, Loader2,
} from 'lucide-react';

const fmt = (n) =>
  `$${Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/* ─── License Upload Field ──────────────────────────────────── */
function LicenseUploadField({ label, file, onChange, id, disabled }) {
  const ref = useRef(null);
  return (
    <div>
      <p className="font-inter text-label-sm font-bold uppercase tracking-[0.05em] text-on-surface/50 mb-2">
        {label}
      </p>
      <button
        type="button"
        onClick={() => ref.current?.click()}
        disabled={disabled}
        className={[
          'w-full flex flex-col items-center justify-center gap-2 py-5 rounded-xl border-2 border-dashed transition-colors cursor-pointer bg-transparent disabled:opacity-50 disabled:cursor-not-allowed',
          file
            ? 'border-emerald-400 bg-emerald-50'
            : 'border-surface-dim hover:border-primary/40 hover:bg-primary/4',
        ].join(' ')}
      >
        {file ? (
          <>
            <CheckCircle2 size={20} className="text-emerald-500" strokeWidth={2} />
            <span className="font-inter text-xs font-semibold text-emerald-600 text-center px-2 truncate max-w-full">
              {file.name}
            </span>
          </>
        ) : (
          <>
            <Upload size={18} className="text-on-surface/35" strokeWidth={1.8} />
            <span className="font-inter text-xs text-on-surface/40">Click to upload</span>
          </>
        )}
      </button>
      <input
        ref={ref}
        id={id}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={onChange}
      />
    </div>
  );
}

/* ─── Form Field ────────────────────────────────────────────── */
function FormField({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-inter text-label-sm font-bold uppercase tracking-[0.05em] text-on-surface/50">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  'w-full rounded-lg border border-surface-dim bg-surface-low px-3 py-2 font-inter text-sm text-on-surface placeholder:text-on-surface/30 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition';

/* ─── License Already On File ───────────────────────────────── */
function LicenseOnFile() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-3 py-6 px-2">
      <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
        <ShieldCheck size={24} className="text-emerald-600" strokeWidth={2} />
      </div>
      <div>
        <p className="font-manrope font-extrabold text-base text-on-surface">
          License On File
        </p>
        <p className="font-inter text-xs text-on-surface/50 mt-1 leading-relaxed">
          Your driver's license has already been submitted. You're ready to book!
        </p>
      </div>
    </div>
  );
}

/* ─── License Form (new license) ───────────────────────────── */
function LicenseForm({
  licenseNumber,
  issuingCountry,
  expiryDate,
  licenseFront,
  licenseBack,
  onLicenseNumberChange,
  onIssuingCountryChange,
  onExpiryDateChange,
  onLicenseFrontChange,
  onLicenseBackChange,
  disabled,
}) {
  const allFilled = licenseNumber && issuingCountry && expiryDate && licenseFront && licenseBack;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="font-inter text-label-sm font-bold uppercase tracking-[0.05em] text-on-surface/40 mb-1">
          Driver's License
        </p>
        <p className="font-inter text-xs text-on-surface/40 leading-relaxed">
          Submit your license details and upload both sides so the owner can verify your identity.
        </p>
      </div>

      <FormField label="License Number">
        <input
          type="text"
          className={inputCls}
          placeholder="e.g. EG-123-456789"
          value={licenseNumber}
          onChange={onLicenseNumberChange}
          disabled={disabled}
        />
      </FormField>

      <FormField label="Issuing Country">
        <input
          type="text"
          className={inputCls}
          placeholder="e.g. Egypt"
          value={issuingCountry}
          onChange={onIssuingCountryChange}
          disabled={disabled}
        />
      </FormField>

      <FormField label="Expiry Date">
        <input
          type="date"
          className={inputCls}
          value={expiryDate}
          onChange={onExpiryDateChange}
          disabled={disabled}
          min={new Date().toISOString().split('T')[0]}
        />
      </FormField>

      <LicenseUploadField
        id="license-front"
        label="Front Side"
        file={licenseFront}
        onChange={onLicenseFrontChange}
        disabled={disabled}
      />
      <LicenseUploadField
        id="license-back"
        label="Back Side"
        file={licenseBack}
        onChange={onLicenseBackChange}
        disabled={disabled}
      />

      {allFilled ? (
        <div className="flex items-start gap-2 text-xs text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2.5">
          <CheckCircle2 size={13} className="text-emerald-500 mt-0.5 shrink-0" strokeWidth={2} />
          All fields complete — ready to submit.
        </div>
      ) : (
        <div className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2.5">
          <FileText size={13} className="text-amber-500 mt-0.5 shrink-0" strokeWidth={2} />
          All fields and both license images are required.
        </div>
      )}
    </div>
  );
}

/* ─── Success State ─────────────────────────────────────────── */
function SuccessPane({ car, booking, onClose }) {
  return (
    <div className="flex flex-col items-center text-center px-8 py-10">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{ background: 'linear-gradient(135deg,#059669,#34d399)' }}
      >
        <CheckCircle2 size={36} className="text-white" strokeWidth={2} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="font-manrope font-extrabold text-2xl text-on-surface mb-2">
          Request Sent!
        </h2>
        <p className="font-inter text-body-md text-on-surface/55 max-w-xs mx-auto leading-relaxed">
          Your rental request for the <strong className="text-on-surface">{car.name}</strong> has
          been sent to the owner. You'll be notified once they respond.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="flex items-center gap-3 mt-6 flex-wrap justify-center"
      >
        <span className="flex items-center gap-1.5 text-xs font-semibold text-on-surface/60 bg-surface-low px-3 py-1.5 rounded-full">
          <Calendar size={12} /> {booking.startDate} → {booking.endDate}
        </span>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-on-surface/60 bg-surface-low px-3 py-1.5 rounded-full">
          <MapPin size={12} /> {booking.location}
        </span>
        <span className="flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/8 px-3 py-1.5 rounded-full">
          Total: {fmt(booking.total)}
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-2 mt-6 px-5 py-3 rounded-xl text-amber-700 text-sm font-semibold"
        style={{ background: '#fef9c3' }}
      >
        <Clock size={15} className="text-amber-500" />
        Waiting for owner approval — no charge yet
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex gap-3 mt-8 w-full max-w-xs"
      >
        <Link
          to="/renter-dashboard"
          className="flex-1 py-3 rounded-xl font-inter font-bold text-sm text-center no-underline text-white"
          style={{ background: 'linear-gradient(135deg,#003d9b,#0052cc)' }}
          onClick={onClose}
        >
          View in Dashboard
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-3 rounded-xl font-inter font-semibold text-sm text-on-surface/60 bg-surface-low hover:bg-surface-mid transition-colors cursor-pointer border-0"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
}

/* ─── Main Modal ────────────────────────────────────────────── */
export default function RentalRequestModal({
  isOpen,
  onClose,
  car,
  booking,
  hasLicense,
  licenseFront,
  licenseBack,
  onLicenseFrontChange,
  onLicenseBackChange,
  licenseNumber,
  issuingCountry,
  expiryDate,
  onLicenseNumberChange,
  onIssuingCountryChange,
  onExpiryDateChange,
  onConfirm,
  isSubmitting,
  isSuccess,
  submitError,
}) {
  if (!car) return null;

  const { numDays, subtotal, serviceFee, insurance, total } = booking;
  const dailyRate = subtotal / numDays;

  // canSubmit depends on whether user has an existing license
  const newLicenseReady =
    !!licenseNumber && !!issuingCountry && !!expiryDate && !!licenseFront && !!licenseBack;
  const canSubmit = hasLicense === null
    ? false                              // still loading — wait
    : hasLicense
      ? true                             // license on file — always ready
      : newLicenseReady || !!submitError; // new license — all fields needed

  const subtitleText = hasLicense
    ? 'Review your booking details below.'
    : 'Review your booking and provide your driver\'s license to proceed.';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={!isSubmitting ? onClose : undefined}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="relative w-full max-w-2xl bg-surface-bright rounded-2xl shadow-deep overflow-hidden pointer-events-auto"
              style={{ maxHeight: '90vh', overflowY: 'auto' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              {!isSuccess && (
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-surface-low flex items-center justify-center text-on-surface/50 hover:text-on-surface hover:bg-surface-mid transition-colors cursor-pointer border-0 disabled:opacity-40"
                >
                  <X size={16} strokeWidth={2} />
                </button>
              )}

              {/* ── Success pane ── */}
              {isSuccess ? (
                <SuccessPane car={car} booking={booking} onClose={onClose} />
              ) : (
                <>
                  {/* Header */}
                  <div className="px-7 pt-7 pb-5 border-b border-surface-dim">
                    <h2 className="font-manrope font-extrabold text-xl text-on-surface">
                      Confirm Rental Request
                    </h2>
                    <p className="font-inter text-body-md text-on-surface/45 mt-0.5">
                      {subtitleText}
                    </p>
                  </div>

                  <div className="px-7 py-6 grid grid-cols-[1fr_1px_1fr] gap-6">
                    {/* ─ Left: trip summary ─ */}
                    <div className="flex flex-col gap-5">
                      <p className="font-inter text-label-sm font-bold uppercase tracking-[0.05em] text-on-surface/40">
                        Trip Summary
                      </p>

                      {/* Car info */}
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-surface-mid">
                          {car.primaryImageUrl ? (
                            <img src={car.primaryImageUrl} alt={car.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Car size={22} className="text-on-surface/30" strokeWidth={1.6} />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-manrope font-bold text-base text-on-surface leading-tight">
                            {car.name}
                          </p>
                          <p className="font-inter text-xs text-on-surface/45 mt-0.5">
                            {car.location ?? booking.location}
                          </p>
                        </div>
                      </div>

                      {/* Dates */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar size={14} className="text-primary/70" strokeWidth={1.8} />
                          <span className="font-inter text-on-surface/60">
                            <span className="font-semibold text-on-surface">{booking.startDate}</span>
                            {' → '}
                            <span className="font-semibold text-on-surface">{booking.endDate}</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin size={14} className="text-primary/70" strokeWidth={1.8} />
                          <span className="font-inter text-on-surface/60">{booking.location}</span>
                        </div>
                      </div>

                      {/* Price breakdown */}
                      <div className="flex flex-col mt-1">
                        {[
                          { label: `${numDays} day${numDays > 1 ? 's' : ''} × ${fmt(dailyRate)}`, value: fmt(subtotal) },
                          { label: 'Platform Service Fee', value: fmt(serviceFee) },
                          { label: 'Insurance (Premium Coverage)', value: fmt(insurance) },
                        ].map(({ label, value }) => (
                          <div key={label} className="flex items-center justify-between py-1.5">
                            <span className="font-inter text-sm text-on-surface/55">{label}</span>
                            <span className="font-inter text-sm font-semibold text-on-surface/75">{value}</span>
                          </div>
                        ))}
                        <div className="flex items-center justify-between pt-3 mt-1 border-t border-outline-variant/20">
                          <span className="font-inter text-sm font-bold text-on-surface">Total Amount</span>
                          <span className="font-manrope font-extrabold text-xl text-primary">{fmt(total)}</span>
                        </div>
                      </div>

                      <p className="font-inter text-label-sm text-on-surface/35 uppercase tracking-[0.04em]">
                        No charge until owner accepts
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="bg-surface-dim self-stretch" />

                    {/* ─ Right: license section ─ */}
                    <div className="flex flex-col gap-5">
                      {hasLicense === null ? (
                        <div className="flex flex-col items-center justify-center py-10 gap-3 text-on-surface/40">
                          <Loader2 size={24} className="animate-spin" strokeWidth={2} />
                          <p className="font-inter text-xs">Checking license status…</p>
                        </div>
                      ) : hasLicense ? (
                        <LicenseOnFile />
                      ) : (
                        <LicenseForm
                          licenseNumber={licenseNumber}
                          issuingCountry={issuingCountry}
                          expiryDate={expiryDate}
                          licenseFront={licenseFront}
                          licenseBack={licenseBack}
                          onLicenseNumberChange={onLicenseNumberChange}
                          onIssuingCountryChange={onIssuingCountryChange}
                          onExpiryDateChange={onExpiryDateChange}
                          onLicenseFrontChange={onLicenseFrontChange}
                          onLicenseBackChange={onLicenseBackChange}
                          disabled={isSubmitting}
                        />
                      )}
                    </div>
                  </div>

                  {/* Footer CTA */}
                  <div className="px-7 pb-7">
                    {submitError && (
                      <div className="mb-3 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                        <span className="text-red-500 text-sm mt-0.5">⚠</span>
                        <p className="font-inter text-sm text-red-700 leading-snug">{submitError}</p>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={onConfirm}
                      disabled={!canSubmit || isSubmitting}
                      className="w-full py-4 rounded-xl font-inter font-bold text-base text-white transition-all duration-200 cursor-pointer border-0 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ background: canSubmit ? 'linear-gradient(135deg,#003d9b,#0052cc)' : '#9ca3af' }}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending Request…
                        </span>
                      ) : (
                        'Confirm & Request Rental →'
                      )}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
