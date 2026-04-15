import StatusChip from '../../../shared/components/StatusChip';

/**
 * User profile card — avatar, name, email, tier chip.
 */
export default function UserProfileCard({ user }) {
  return (
    <div className="flex flex-col items-center text-center pb-6">
      {/* Avatar */}
      <div className="w-20 h-20 rounded-full bg-secondary-container flex items-center justify-center font-manrope font-extrabold text-[1.5rem] text-on-secondary-container mb-4">
        {user.initials}
      </div>

      <h2 className="font-manrope font-bold text-title-md text-on-surface">{user.name}</h2>
      <p className="font-inter text-body-md text-on-surface/45 mt-1 mb-3">{user.email}</p>

      <StatusChip label={user.tier} variant={user.tierVariant} />
    </div>
  );
}
