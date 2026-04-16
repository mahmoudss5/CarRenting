import { ShieldCheck } from 'lucide-react';
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
      icon={ShieldCheck}
      title="Security"
      description="Update your password regularly to keep your account secure."
    >
      <form className="space-y-5" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <EditorialInput
            id="currentPassword"
            name="currentPassword"
            type="password"
            label="Current Password"
            placeholder="••••••••"
            value={form.currentPassword}
            onChange={(e) => onChange('currentPassword', e.target.value)}
          />
          <EditorialInput
            id="newPassword"
            name="newPassword"
            type="password"
            label="New Password"
            placeholder="••••••••"
            value={form.newPassword}
            onChange={(e) => onChange('newPassword', e.target.value)}
          />
          <EditorialInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="••••••••"
            value={form.confirmPassword}
            onChange={(e) => onChange('confirmPassword', e.target.value)}
          />
        </div>

        {/* Tip row */}
        <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="font-inter text-[0.75rem] text-amber-700 leading-relaxed">
            Use a strong password with at least 8 characters, combining letters, numbers, and symbols.
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 pt-1">
          {message && (
            <p className={[
              'font-inter text-[0.8125rem]',
              message.toLowerCase().includes('error') || message.toLowerCase().includes('fail') || message.toLowerCase().includes('match')
                ? 'text-red-600'
                : 'text-emerald-600',
            ].join(' ')}>
              {message}
            </p>
          )}
          <div className="ml-auto">
            <PrimaryButton type="submit">
              {isSaving ? 'Updating…' : 'Update Password'}
            </PrimaryButton>
          </div>
        </div>
      </form>
    </SettingsSectionCard>
  );
}
