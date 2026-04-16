import { Settings2, Bell } from 'lucide-react';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import SettingsSectionCard from './SettingsSectionCard';

/* ─── Shared select class ────────────────────────────────────── */
const selectClass =
  'w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 font-inter text-[0.875rem] text-slate-800 outline-none cursor-pointer transition-all duration-200 hover:border-blue-300 hover:shadow-sm focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 focus:shadow-md pr-9';

function SelectField({ id, label, value, onChange, options }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-inter text-[0.7rem] font-semibold uppercase tracking-widest text-slate-500">
        {label}
      </span>
      <div className="relative">
        <select id={id} value={value} onChange={onChange} className={selectClass}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
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
      icon={Settings2}
      title="Rental Preferences"
      description="Set your default rental preferences to get better recommendations."
    >
      <form className="space-y-5" onSubmit={onSubmit}>
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

        {/* Notifications toggle */}
        <label className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 cursor-pointer hover:border-blue-200 hover:bg-blue-50/40 transition-all duration-200 group">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white border border-slate-200 group-hover:border-blue-200 transition-colors">
              <Bell size={14} className="text-slate-500 group-hover:text-blue-500 transition-colors" strokeWidth={1.8} />
            </div>
            <div>
              <p className="font-inter text-[0.875rem] font-semibold text-slate-800">
                Booking Notifications
              </p>
              <p className="font-inter text-[0.75rem] text-slate-500">
                Receive trip reminders and booking updates by email.
              </p>
            </div>
          </div>
          {/* Custom toggle */}
          <div className="relative flex-shrink-0">
            <input
              type="checkbox"
              checked={form.notifications}
              onChange={(e) => onChange('notifications', e.target.checked)}
              className="sr-only"
            />
            <div
              className={[
                'h-6 w-11 rounded-full transition-colors duration-200',
                form.notifications ? 'bg-blue-600' : 'bg-slate-200',
              ].join(' ')}
            />
            <div
              className={[
                'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200',
                form.notifications ? 'translate-x-5' : 'translate-x-0.5',
              ].join(' ')}
            />
          </div>
        </label>

        <div className="flex items-center justify-between gap-4 pt-1">
          {message && (
            <p className="font-inter text-[0.8125rem] text-emerald-600">{message}</p>
          )}
          <div className="ml-auto">
            <PrimaryButton type="submit">
              {isSaving ? 'Saving…' : 'Save Preferences'}
            </PrimaryButton>
          </div>
        </div>
      </form>
    </SettingsSectionCard>
  );
}
