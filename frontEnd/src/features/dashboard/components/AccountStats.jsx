function StatMini({ label, value }) {
  return (
    <div className="bg-surface-container-low rounded-xl px-4 py-3">
      <p className="font-inter text-label-sm font-bold tracking-[0.05em] uppercase text-on-surface/40 mb-1">
        {label}
      </p>
      <p className="font-manrope font-extrabold text-[1.4rem] text-on-surface">{value}</p>
    </div>
  );
}

/**
 * Two-column stat mini-cards — Total Trips / Join Date.
 */
export default function AccountStats({ stats }) {
  return (
    <div>
      <p className="font-inter text-label-sm font-bold tracking-[0.05em] uppercase text-on-surface/35 mb-3">
        Account Statistics
      </p>
      <div className="grid grid-cols-2 gap-3">
        <StatMini label="Total Trips" value={stats.totalTrips} />
        <StatMini label="Join Date" value={stats.joinDate} />
      </div>
    </div>
  );
}
