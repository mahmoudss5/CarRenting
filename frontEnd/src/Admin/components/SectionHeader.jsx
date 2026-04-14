export default function SectionHeader({ title, badge, right }) {
  return (
    <div className="flex items-center justify-between px-6 pt-6 pb-4">
      <div className="flex items-center gap-3">
        <h2 className="font-display font-semibold text-headline-sm text-on-surface">
          {title}
        </h2>

        {badge && (
          <span className="bg-tertiary-fixed text-tertiary font-body text-label-sm uppercase tracking-[0.05em] px-2.5 py-1 rounded-full">
            {badge}
          </span>
        )}
      </div>

      {right && <div>{right}</div>}
    </div>
  );
}
