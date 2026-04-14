const STATS = [
  { value: "100+", label: "Premium Vehicles" },
  { value: "500+", label: "Trusted Members" },
  { value: "4.9★", label: "Average Rating" },
  { value: "24/7", label: "Customer Support" },
];

function StatItem({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-1 px-8 first:pl-0 last:pr-0">
      <span className="font-display font-bold text-2xl text-primary">{value}</span>
      <span className="font-body text-label-sm uppercase tracking-[0.05em] text-on-surface/50">
        {label}
      </span>
    </div>
  );
}

export default function StatsBar() {
  return (
    <section className="bg-surface-bright shadow-float">
      <div className="max-w-screen-xl mx-auto px-8 lg:px-16 py-8">
        <div className="flex items-center justify-center flex-wrap gap-y-6 divide-x divide-surface-dim">
          {STATS.map((stat, i) => (
            <StatItem key={i} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
