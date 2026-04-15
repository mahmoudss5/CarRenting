export default function ProfileSettingsHeader({ fullName, email }) {
  return (
    <div className="rounded-2xl bg-surface p-6 shadow-card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-inter text-label-sm font-bold uppercase tracking-[0.05em] text-primary">
            Renter Account
          </p>
          <h1 className="mt-2 font-manrope text-display-sm font-extrabold text-on-surface">
            Profile Settings
          </h1>
          <p className="mt-2 font-inter text-body-md text-on-surface/60">
            Update your renter profile, preferences, and account security.
          </p>
        </div>

        <div className="rounded-xl bg-secondary-container px-4 py-2 text-right">
          <p className="font-manrope text-title-md font-bold text-on-secondary-container">{fullName}</p>
          <p className="font-inter text-body-md text-on-secondary-container/80">{email}</p>
        </div>
      </div>
    </div>
  );
}
