import PrimaryButton from "../../components/ui/PrimaryButton";

export default function RequestActionButtons({ onAccept, onReject, acceptDisabled = false }) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onReject}
        className="rounded-full bg-surface-high px-4 py-2 font-body text-body-md text-on-surface transition-colors hover:bg-surface-highest"
      >
        Reject
      </button>
      <PrimaryButton
        onClick={onAccept}
        disabled={acceptDisabled}
        fullWidth={false}
        className="rounded-full px-5 py-2 text-body-md"
      >
        Accept
      </PrimaryButton>
      {acceptDisabled ? (
        <span className="font-body text-label-sm uppercase text-tertiary">License verification required</span>
      ) : null}
    </div>
  );
}
