const SPEC_ICONS = {
  brand: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path strokeLinecap="round" d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
    </svg>
  ),
  model: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17H5a2 2 0 01-2-2v-3l3-6h10l3 6v3a2 2 0 01-2 2h-4m-4 0a2 2 0 104 0m-4 0a2 2 0 014 0" />
    </svg>
  ),
  year: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
  transmission: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5" aria-hidden="true">
      <circle cx="5" cy="6" r="2" /><circle cx="12" cy="6" r="2" /><circle cx="19" cy="6" r="2" />
      <circle cx="5" cy="18" r="2" /><circle cx="12" cy="18" r="2" />
      <path strokeLinecap="round" d="M5 8v8m7-8v8m7-8v4" />
    </svg>
  ),
  fuelType: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 22V9l6-7 6 7v13H3zm6-7v4m6-8h2a1 1 0 011 1v7a2 2 0 01-2 2h-1" />
    </svg>
  ),
  seats: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path strokeLinecap="round" d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
};

const SPECS = [
  { key: 'brand',        label: 'Brand' },
  { key: 'model',        label: 'Model' },
  { key: 'year',         label: 'Year' },
  { key: 'transmission', label: 'Transmission' },
  { key: 'fuelType',     label: 'Fuel Type' },
  { key: 'seats',        label: 'Seats' },
];

function SpecCell({ spec, car }) {
  return (
    <div className="flex flex-col gap-2 p-5">
      <span className="text-primary">{SPEC_ICONS[spec.key]}</span>
      <p className="font-inter text-label-sm font-bold tracking-[0.05em] uppercase text-on-surface/40">
        {spec.label}
      </p>
      <p className="font-manrope font-bold text-[1rem] text-on-surface">
        {car[spec.key]}
      </p>
    </div>
  );
}

/**
 * 2×3 specs grid — surface-container-low bg for tonal separation.
 * No borders between cells; vertical whitespace creates structure.
 */
export default function CarSpecsGrid({ car }) {
  return (
    <div className="mt-6 bg-surface-container-low rounded-xl overflow-hidden">
      <div className="grid grid-cols-3">
        {SPECS.map((spec, i) => (
          <div
            key={spec.key}
            className={[
              i >= 3 ? 'border-t border-outline-variant/15' : '',
              i % 3 !== 2 ? 'border-r border-outline-variant/15' : '',
            ].join(' ')}
          >
            <SpecCell spec={spec} car={car} />
          </div>
        ))}
      </div>
    </div>
  );
}
