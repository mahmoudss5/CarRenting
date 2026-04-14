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
      title="Personal Information"
      description="Keep your contact details accurate for trip communication."
    >
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <EditorialInput
            id="firstName"
            name="firstName"
            label="First Name"
            value={form.firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
          />
          <EditorialInput
            id="lastName"
            name="lastName"
            label="Last Name"
            value={form.lastName}
            onChange={(e) => onChange('lastName', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <EditorialInput
            id="email"
            name="email"
            type="email"
            label="Email"
            value={form.email}
            onChange={(e) => onChange('email', e.target.value)}
          />
          <EditorialInput
            id="phone"
            name="phone"
            label="Phone Number"
            value={form.phone}
            onChange={(e) => onChange('phone', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <EditorialInput
            id="city"
            name="city"
            label="City"
            value={form.city}
            onChange={(e) => onChange('city', e.target.value)}
          />
          <EditorialInput
            id="country"
            name="country"
            label="Country"
            value={form.country}
            onChange={(e) => onChange('country', e.target.value)}
          />
        </div>

        <EditorialInput
          id="bio"
          name="bio"
          label="Bio"
          value={form.bio}
          onChange={(e) => onChange('bio', e.target.value)}
        />

        <div className="flex items-center justify-between gap-4">
          <p className="font-inter text-body-md text-on-surface/55">{message}</p>
          <PrimaryButton type="submit">{isSaving ? 'Saving...' : 'Save Profile'}</PrimaryButton>
        </div>
      </form>
    </SettingsSectionCard>
  );
}
