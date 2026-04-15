import UserProfileCard from './UserProfileCard';
import AccountStats from './AccountStats';
import LicenseVerification from './LicenseVerification';

/**
 * Left sidebar — profile card + stats + license verification.
 */
export default function DashboardSidebar({ user, licenseProps }) {
  return (
    <aside className="flex flex-col gap-4">
      {/* Profile card */}
      <div
        className="bg-surface rounded-xl p-6"
        style={{ boxShadow: '0 2px 12px rgba(20,27,44,0.06)' }}
      >
        <UserProfileCard user={user} />
        <AccountStats stats={user.stats} />
      </div>

      {/* License card */}
      <LicenseVerification {...licenseProps} />
    </aside>
  );
}
