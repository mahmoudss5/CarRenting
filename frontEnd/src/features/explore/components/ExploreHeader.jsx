import { SORT_OPTIONS } from '../data/exploreCars';
import { GRADIENT_PRIMARY } from '../../../design/tokens';

/**
 * Page header: micro-label, headline, description, result count + sort dropdown.
 */
export default function ExploreHeader({ totalCount, sort, onSortChange }) {
  return (
    <div className="mb-8">
      {/* Editorial label + headline */}
      <p className="font-inter text-label-sm font-bold tracking-[0.05em] uppercase text-on-surface/40 mb-2">
        Curated Collection
      </p>
      <h1
        className="font-manrope font-bold text-on-surface mb-3"
        style={{ fontSize: '2.5rem', letterSpacing: '-0.02em' }}
      >
        Explore Vehicles
      </h1>
      <p className="font-inter text-body-md text-on-surface/55 max-w-md mb-6">
        Premium mobility solutions tailored for your architectural journeys across the city.
      </p>

      {/* Count + sort row */}
      <div className="flex items-center justify-between">
        <p className="font-inter text-[0.875rem] text-on-surface/55">
          <span className="font-semibold text-on-surface">{totalCount}</span> vehicles found
        </p>

        {/* Sort dropdown */}
        <div className="relative">
          <select
            id="explore-sort"
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none pl-4 pr-9 py-2.5 rounded-md font-inter text-[0.875rem] font-medium text-on-surface bg-surface outline-none cursor-pointer focus:ring-1 focus:ring-primary/20 transition-all duration-200"
            style={{ boxShadow: '0 1px 8px rgba(20,27,44,0.08)' }}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {/* Chevron icon */}
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface/50 pointer-events-none"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
