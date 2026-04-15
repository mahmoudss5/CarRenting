import EditorialInput from '../../../shared/components/EditorialInput';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import SettingsSectionCard from './SettingsSectionCard';

export default function SecuritySettingsForm({
  form,
  onChange,
  onSubmit,
  isSaving,
  message,
}) {
  return (
    <SettingsSectionCard
      title="Security"
      description="Update your password regularly to keep your account secure."
    >
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <EditorialInput
            id="currentPassword"
            name="currentPassword"
            type="password"
            label="Current Password"
            value={form.currentPassword}
            onChange={(e) => onChange('currentPassword', e.target.value)}
          />
          <EditorialInput
            id="newPassword"
            name="newPassword"
            type="password"
            label="New Password"
            value={form.newPassword}
            onChange={(e) => onChange('newPassword', e.target.value)}
          />
          <EditorialInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            value={form.confirmPassword}
            onChange={(e) => onChange('confirmPassword', e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="font-inter text-body-md text-on-surface/55">{message}</p>
          <PrimaryButton type="submit">
            {isSaving ? 'Updating...' : 'Update Password'}
          </PrimaryButton>
        </div>
      </form>
    </SettingsSectionCard>
  );
}
