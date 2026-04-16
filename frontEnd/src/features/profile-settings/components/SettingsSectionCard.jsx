/**
 * Settings section card — premium card shell for each settings block.
 */
export default function SettingsSectionCard({ title, description, icon: Icon, children }) {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white shadow-[0_2px_16px_rgba(15,23,42,0.06)] hover:shadow-[0_8px_32px_rgba(15,23,42,0.10)] transition-shadow duration-300">
      <header className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
        {Icon && (
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 ring-1 ring-blue-100">
            <Icon size={16} className="text-blue-600" strokeWidth={2} />
          </div>
        )}
        <div>
          <h2 className="font-inter text-[0.875rem] font-semibold text-slate-800">{title}</h2>
          {description && (
            <p className="font-inter text-[0.75rem] text-slate-500 leading-tight">{description}</p>
          )}
        </div>
      </header>
      <div className="px-6 py-6">{children}</div>
    </section>
  );
}
