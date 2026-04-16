import { User } from 'lucide-react';
import EditorialInput from '../../../shared/components/EditorialInput';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import SettingsSectionCard from './SettingsSectionCard';

export default function PersonalInfoForm({
  form,
  onChange,
  onSubmit,
  isSaving,
  message,
}) {
  return (
    <SettingsSectionCard
      icon={User}
      title="Personal Information"
      description="Keep your contact details accurate for trip communication."
    >
      <form className="space-y-5" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <EditorialInput
            id="firstName"
            name="firstName"
            label="First Name"
            placeholder="John"
            value={form.firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
          />
          <EditorialInput
            id="lastName"
            name="lastName"
            label="Last Name"
            placeholder="Doe"
            value={form.lastName}
            onChange={(e) => onChange('lastName', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <EditorialInput
            id="email"
            name="email"
            type="email"
            label="Email Address"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => onChange('email', e.target.value)}
          />
          <EditorialInput
            id="phone"
            name="phone"
            label="Phone Number"
            placeholder="+1 (555) 000-0000"
            value={form.phone}
            onChange={(e) => onChange('phone', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <EditorialInput
            id="city"
            name="city"
            label="City"
            placeholder="New York"
            value={form.city}
            onChange={(e) => onChange('city', e.target.value)}
          />
          <EditorialInput
            id="country"
            name="country"
            label="Country"
            placeholder="United States"
            value={form.country}
            onChange={(e) => onChange('country', e.target.value)}
          />
        </div>

        <EditorialInput
          id="bio"
          name="bio"
          label="Bio"
          placeholder="A short note about yourself…"
          value={form.bio}
          onChange={(e) => onChange('bio', e.target.value)}
        />

        <div className="flex items-center justify-between gap-4 pt-1">
          {message && (
            <p className={[
              'font-inter text-[0.8125rem]',
              message.toLowerCase().includes('error') || message.toLowerCase().includes('fail')
                ? 'text-red-600'
                : 'text-emerald-600',
            ].join(' ')}>
              {message}
            </p>
          )}
          <div className="ml-auto">
            <PrimaryButton type="submit">
              {isSaving ? 'Saving…' : 'Save Profile'}
            </PrimaryButton>
          </div>
        </div>
      </form>
    </SettingsSectionCard>
  );
}
