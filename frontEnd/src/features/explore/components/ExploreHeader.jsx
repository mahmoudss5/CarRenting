import { SORT_OPTIONS } from '../data/exploreCars';

/**
 * Page header: micro-label, headline, description, result count + sort dropdown.
 */
export default function ExploreHeader({ totalCount, sort, onSortChange }) {
  return (
    <div className="mb-8">
      {/* Micro label */}
      <div className="flex items-center gap-2 mb-3">
        <div className="h-px w-6 bg-blue-500 rounded-full" />
        <p className="font-inter text-[0.68rem] font-bold uppercase tracking-widest text-blue-600">
          Curated Collection
        </p>
      </div>

      {/* Headline */}
      <h1
        className="font-display font-extrabold text-slate-900 mb-2 leading-tight tracking-tight"
        style={{ fontSize: '2.25rem', letterSpacing: '-0.02em' }}
      >
        Explore Vehicles
      </h1>
      <p className="font-inter text-[0.9rem] text-slate-500 max-w-md mb-6 leading-relaxed">
        Premium mobility solutions tailored for your next journey across the city.
      </p>

      {/* Count + sort row */}
      <div className="flex items-center justify-between gap-4">
        <p className="font-inter text-[0.875rem] text-slate-500">
          <span className="font-semibold text-slate-800">{totalCount}</span>{' '}
          vehicle{totalCount !== 1 ? 's' : ''} found
        </p>

        {/* Sort dropdown */}
        <div className="relative">
          <select
            id="explore-sort"
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none rounded-xl border border-slate-200 bg-white pl-4 pr-9 py-2.5 font-inter text-[0.8375rem] font-medium text-slate-700 outline-none cursor-pointer shadow-[0_1px_8px_rgba(15,23,42,0.06)] transition-all duration-200 hover:border-blue-300 hover:shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-5 h-px bg-slate-100" />
    </div>
  );
}
