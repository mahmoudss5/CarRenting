import { useEffect, useCallback } from "react";
import { X, CheckCircle2, XCircle, FileText, ShieldCheck, ShieldX, Clock } from "lucide-react";

const STATUS_CONFIG = {
  verified: {
    label: "Verified",
    icon: ShieldCheck,
    badgeClass: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  },
  pending: {
    label: "Pending Review",
    icon: Clock,
    badgeClass: "bg-amber-50 text-amber-700 border border-amber-200",
  },
  rejected: {
    label: "Rejected",
    icon: ShieldX,
    badgeClass: "bg-red-50 text-red-700 border border-red-200",
  },
};

/**
 * LicenseVerificationModal
 *
 * Props:
 *   request       – full rental request object (renterName, driverLicense)
 *   onClose()     – dismiss the modal
 *   onVerify(id)  – mark license as verified
 *   onReject(id)  – mark license as rejected
 */
export default function LicenseVerificationModal({ request, onClose, onVerify, onReject }) {
  const { driverLicense: license, renterName } = request;
  const cfg = STATUS_CONFIG[license.status] ?? STATUS_CONFIG.pending;
  const StatusIcon = cfg.icon;

  /* Close on Escape */
  const handleKey = useCallback((e) => { if (e.key === "Escape") onClose(); }, [onClose]);
  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  const isPending  = license.status === "pending";
  const isVerified = license.status === "verified";
  const isRejected = license.status === "rejected";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(10, 14, 27, 0.65)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl overflow-hidden"
        style={{
          boxShadow: "0 32px 80px rgba(10,14,27,0.30)",
          animation: "licenseModalIn 0.22s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-on-surface/50" strokeWidth={1.8} />
            <h2 className="font-display text-headline-sm text-on-surface">Driver License Review</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface/50 hover:bg-gray-100 transition-colors duration-150"
          >
            <X size={16} strokeWidth={2} />
          </button>
        </div>

        {/* ── Renter info ── */}
        <div className="px-6 pt-5 pb-3 flex items-center justify-between">
          <div>
            <p className="font-body text-label-sm uppercase text-on-surface/45 tracking-[0.05em] mb-0.5">
              Submitted by
            </p>
            <p className="font-display text-title-md text-on-surface font-semibold">{renterName}</p>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${cfg.badgeClass}`}
          >
            <StatusIcon size={12} strokeWidth={2} />
            {cfg.label}
          </span>
        </div>

        {/* ── License image ── */}
        <div className="px-6 mb-4">
          <div className="relative rounded-xl overflow-hidden bg-gray-900 border border-gray-200">
            <img
              src={license.imageUrl}
              alt={`Driver license ${license.licenseNumber}`}
              className="w-full object-cover"
              style={{ minHeight: "180px" }}
            />
            {/* watermark overlay for rejected */}
            {isRejected && (
              <div className="absolute inset-0 flex items-center justify-center bg-red-900/20">
                <span
                  className="font-display text-red-400 text-4xl font-black tracking-widest select-none"
                  style={{ transform: "rotate(-25deg)", opacity: 0.6 }}
                >
                  REJECTED
                </span>
              </div>
            )}
            {isVerified && (
              <div className="absolute inset-0 flex items-center justify-center bg-emerald-900/15">
                <span
                  className="font-display text-emerald-400 text-4xl font-black tracking-widest select-none"
                  style={{ transform: "rotate(-25deg)", opacity: 0.5 }}
                >
                  VERIFIED
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── License details ── */}
        <div className="px-6 mb-6">
          <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 grid grid-cols-3 gap-4">
            {[
              { label: "License No.", value: license.licenseNumber },
              { label: "Submitted",   value: license.submittedAt   },
              { label: "Expires",     value: license.expiryDate    },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="font-body text-label-sm uppercase text-on-surface/45 tracking-[0.04em] mb-0.5">
                  {label}
                </p>
                <p className="font-body text-body-md text-on-surface font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="px-6 pb-6 flex gap-3">
          {/* Reject license button — always shown unless already rejected */}
          {!isRejected && (
            <button
              type="button"
              onClick={() => { onReject(request.id); onClose(); }}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 text-red-700 font-body font-semibold text-sm py-2.5 hover:bg-red-100 transition-colors duration-150"
            >
              <XCircle size={15} strokeWidth={1.8} />
              Reject License
            </button>
          )}

          {/* Verify license button — always shown unless already verified */}
          {!isVerified && (
            <button
              type="button"
              onClick={() => { onVerify(request.id); onClose(); }}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 text-white font-body font-semibold text-sm py-2.5 hover:bg-emerald-700 transition-colors duration-150"
            >
              <CheckCircle2 size={15} strokeWidth={1.8} />
              Verify License
            </button>
          )}

          {/* Neutral close if no action available (already both applied) */}
          {isVerified && isRejected && (
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-200 text-on-surface/70 font-body font-semibold text-sm py-2.5 hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes licenseModalIn {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)     scale(1);    }
        }
      `}</style>
    </div>
  );
}
