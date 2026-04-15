/**
 * Admin stat card — surface-container-lowest bg, tinted ambient shadow.
 * Displays a metric with an optional trend badge.
 */
export default function StatCard({ label, value, badge, badgeVariant = 'positive' }) {
  const badgeClasses = {
    positive: 'bg-[#e6f4ea] text-[#1b5e20]',
    warning: 'bg-tertiary-fixed text-tertiary',
    neutral: 'bg-surface-container text-on-surface/60',
  };

  return (
    <div
      className="bg-surface-container-lowest rounded-xl p-6"
      style={{ boxShadow: '0 2px 12px rgba(20, 27, 44, 0.06)' }}
    >
      <p className="font-inter text-label-sm font-bold tracking-[0.05em] uppercase text-on-surface/45 mb-3">
        {label}
      </p>
      <div className="flex items-center gap-3">
        <span className="font-manrope font-extrabold text-[2rem] text-on-surface">
          {typeof value === 'number' ? value.toLocaleString('en-US') : value}
        </span>
        {badge && (
          <span
            className={`font-inter text-label-sm font-semibold px-2.5 py-1 rounded-full ${
              badgeClasses[badgeVariant] ?? badgeClasses.neutral
            }`}
          >
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}
