import { UserCircle, Mail } from 'lucide-react';

export default function ProfileSettingsHeader({ fullName, email }) {
  const initials = fullName
    ? fullName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_2px_16px_rgba(15,23,42,0.06)] px-6 py-7">
      {/* Decorative gradient blob */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-blue-100/60 blur-3xl" />
      <div className="pointer-events-none absolute right-20 -bottom-8 h-32 w-32 rounded-full bg-indigo-100/40 blur-2xl" />

      <div className="relative flex items-center gap-5">
        {/* Avatar */}
        <div className="flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-display font-bold text-lg shadow-[0_4px_16px_rgba(0,61,155,0.30)]">
          {initials}
        </div>

        {/* Text */}
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <UserCircle size={12} className="text-blue-500" strokeWidth={2} />
            <span className="font-inter text-[0.68rem] font-bold uppercase tracking-widest text-blue-600">
              Renter Account
            </span>
          </div>
          <h1 className="font-display font-extrabold text-[1.75rem] leading-tight tracking-tight text-slate-900 md:text-[2.1rem]">
            Profile Settings
          </h1>
          <p className="mt-1 font-inter text-[0.85rem] text-slate-500 leading-relaxed">
            Update your renter profile, preferences, and account security.
          </p>
        </div>

        {/* User identity badge */}
        <div className="ml-auto hidden md:flex flex-col items-end gap-1">
          <p className="font-inter text-[0.875rem] font-semibold text-slate-800">{fullName}</p>
          <div className="flex items-center gap-1.5">
            <Mail size={11} className="text-slate-400" strokeWidth={2} />
            <p className="font-inter text-[0.8rem] text-slate-500">{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
