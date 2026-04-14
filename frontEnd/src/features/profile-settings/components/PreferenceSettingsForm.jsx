import PrimaryButton from '../../../shared/components/PrimaryButton';
import SettingsSectionCard from './SettingsSectionCard';

function SelectField({ id, label, value, onChange, options }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-label-sm font-bold uppercase tracking-[0.05em] text-on-surface/50">
        {label}
      </span>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="rounded-md border border-outline-variant bg-surface px-4 py-3 font-inter text-body-md text-on-surface outline-none focus:border-primary"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function PreferenceSettingsForm({
  form,
  onChange,
  onSubmit,
  isSaving,
  message,
}) {
  return (
    <SettingsSectionCard
      title="Rental Preferences"
      description="Set your default rental preferences to get better recommendations."
    >
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <SelectField
            id="vehicleType"
            label="Vehicle Type"
            value={form.vehicleType}
            onChange={(e) => onChange('vehicleType', e.target.value)}
            options={['SUV', 'Sedan', 'Coupe', 'Luxury', 'Convertible']}
          />
          <SelectField
            id="transmission"
            label="Transmission"
            value={form.transmission}
            onChange={(e) => onChange('transmission', e.target.value)}
            options={['Automatic', 'Manual']}
          />
          <SelectField
            id="fuelType"
            label="Fuel Type"
            value={form.fuelType}
            onChange={(e) => onChange('fuelType', e.target.value)}
            options={['Electric', 'Hybrid', 'Gasoline', 'Diesel']}
          />
        </div>

        <label className="flex items-center justify-between rounded-xl bg-surface-container-low px-4 py-3">
          <div>
            <p className="font-manrope text-title-md font-semibold text-on-surface">
              Booking Notifications
            </p>
            <p className="font-inter text-body-md text-on-surface/60">
              Receive trip reminders and booking updates by email.
            </p>
          </div>
          <input
            type="checkbox"
            checked={form.notifications}
            onChange={(e) => onChange('notifications', e.target.checked)}
            className="h-5 w-5 accent-primary"
          />
        </label>

        <div className="flex items-center justify-between gap-4">
          <p className="font-inter text-body-md text-on-surface/55">{message}</p>
          <PrimaryButton type="submit">{isSaving ? 'Saving...' : 'Save Preferences'}</PrimaryButton>
        </div>
      </form>
    </SettingsSectionCard>
  );
}
