import PrimaryButton from '../../../shared/components/PrimaryButton';

function PendingNotice() {
  return (
    <div className="flex items-start gap-3 bg-secondary-container/40 rounded-lg px-4 py-3 mb-4">
      <span className="text-primary mt-0.5 text-lg">💬</span>
      <div>
        <p className="font-inter text-[0.875rem] font-semibold text-on-surface">
          Verification Pending
        </p>
        <p className="font-inter text-body-md text-on-surface/50 mt-0.5">
          Estimated review: 2–4 hours
        </p>
      </div>
    </div>
  );
}

function UploadZone({ licenseFile, onFileChange }) {
  return (
    <label
      htmlFor="license-upload"
      className="flex flex-col items-center gap-2 rounded-xl border-2 border-dashed border-outline-variant/40 p-5 cursor-pointer hover:border-primary/40 hover:bg-surface-container-low/50 transition-all duration-200"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        className="w-8 h-8 text-on-surface/30"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
      <p className="font-inter text-[0.8125rem] font-semibold text-on-surface/60 text-center">
        {licenseFile ? licenseFile.name : 'Update License Document'}
      </p>
      <p className="font-inter text-label-sm text-on-surface/35">
        JPEG, PNG or PDF (Max 5MB)
      </p>
      <input
        id="license-upload"
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        onChange={onFileChange}
        className="sr-only"
      />
    </label>
  );
}

/**
 * Driver license verification card.
 * Receives all file state as props — no local state.
 */
export default function LicenseVerification({ licenseFile, onFileChange, onSubmit, isSubmitting }) {
  return (
    <div
      className="bg-surface rounded-xl p-5 mt-4"
      style={{ boxShadow: '0 2px 12px rgba(20,27,44,0.06)' }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-primary text-lg">🛡</span>
        <h3 className="font-manrope font-bold text-[1rem] text-on-surface">
          Driver License Verification
        </h3>
      </div>

      <PendingNotice />
      <UploadZone licenseFile={licenseFile} onFileChange={onFileChange} />

      <form onSubmit={onSubmit} className="mt-4">
        <PrimaryButton
          type="submit"
          size="md"
          className="w-full justify-center"
          style={isSubmitting ? { opacity: 0.7 } : {}}
        >
          {isSubmitting ? 'Submitting…' : 'Submit for Review'}
        </PrimaryButton>
      </form>
    </div>
  );
}
