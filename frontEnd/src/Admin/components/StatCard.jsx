export default function StatCard({ label, value, trend, trendUp = true, badge, icon: Icon }) {
  const formatted = typeof value === "number" ? value.toLocaleString("en-US") : value;

  return (
    <div className="bg-surface-bright rounded-lg p-6 shadow-ambient flex flex-col gap-3">
      {Icon && (
        <div className="w-10 h-10 rounded-full bg-surface-low flex items-center justify-center text-on-surface/40">
          <Icon />
        </div>
      )}

      <p className="font-body text-label-sm uppercase tracking-[0.05em] text-on-surface/45">
        {label}
      </p>

      <div className="flex items-center gap-3 flex-wrap">
        <span className="font-display font-bold text-[2rem] leading-none text-on-surface">
          {formatted}
        </span>

        {trend && (
          <span
            className={[
              "font-body font-semibold text-sm",
              trendUp ? "text-emerald-500" : "text-[#e53935]",
            ].join(" ")}
          >
            {trend}
          </span>
        )}

        {badge && (
          <span className="bg-tertiary-fixed text-tertiary font-body text-label-sm uppercase tracking-[0.05em] px-2.5 py-1 rounded-full">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}
