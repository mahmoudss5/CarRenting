/**
 * Shared settings section shell.
 */
export default function SettingsSectionCard({ title, description, children }) {
  return (
    <section className="rounded-2xl bg-surface p-6 shadow-card">
      <header className="mb-5">
        <h2 className="font-manrope text-headline-sm font-bold text-on-surface">{title}</h2>
        <p className="mt-1 font-inter text-body-md text-on-surface/60">{description}</p>
      </header>
      {children}
    </section>
  );
}
