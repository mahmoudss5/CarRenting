import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import PrimaryButton from "../../components/ui/PrimaryButton";

export default function RequestActionButtons({ onAccept, onReject, acceptDisabled = false }) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <button
        type="button"
        onClick={onReject}
        className="flex items-center gap-1.5 rounded-full bg-surface-high border border-surface-dim px-4 py-2 font-body text-body-md text-on-surface/70 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
      >
        <XCircle size={14} strokeWidth={1.8} />
        Reject
      </button>
      <PrimaryButton
        onClick={onAccept}
        disabled={acceptDisabled}
        fullWidth={false}
        className="flex items-center gap-1.5 rounded-full px-5 py-2 text-body-md"
      >
        <CheckCircle2 size={14} strokeWidth={1.8} />
        Accept
      </PrimaryButton>
      {acceptDisabled && (
        <span className="flex items-center gap-1 font-body text-label-sm uppercase text-tertiary">
          <AlertCircle size={12} strokeWidth={1.8} />
          License verification required
        </span>
      )}
    </div>
  );
}
