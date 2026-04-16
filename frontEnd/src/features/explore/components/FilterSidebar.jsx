import { SlidersHorizontal } from 'lucide-react';
import FilterCategory from './FilterCategory';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import { FILTER_CATEGORIES, FILTER_OPTIONS } from '../data/exploreCars';

/* ─── Checkbox option ────────────────────────────────────────── */
function CheckboxOption({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group py-0.5">
      <div className={[
        'flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border transition-all duration-150',
        checked
          ? 'border-blue-600 bg-blue-600'
          : 'border-slate-300 bg-white group-hover:border-blue-400',
      ].join(' ')}>
        {checked && (
          <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
          </svg>
        )}
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onChange(label)}
        className="sr-only"
      />
      <span className={[
        'font-inter text-[0.8125rem] transition-colors duration-150',
        checked ? 'text-slate-800 font-medium' : 'text-slate-500 group-hover:text-slate-700',
      ].join(' ')}>
        {label}
      </span>
    </label>
  );
}

/* ─── Price range panel ──────────────────────────────────────── */
function PriceRangePanel({ priceRange, setPriceRange }) {
  const inputClass =
    'w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 font-inter text-[0.8125rem] text-slate-800 outline-none transition-all duration-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10';

  return (
    <div className="px-1 pt-2 pb-1 flex flex-col gap-3">
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="mb-1 block font-inter text-[0.65rem] font-semibold uppercase tracking-widest text-slate-400">
            Min $
          </label>
          <input
            type="number"
            min={0}
            max={priceRange.max}
            value={priceRange.min}
            onChange={(e) => setPriceRange(Number(e.target.value), priceRange.max)}
            className={inputClass}
          />
        </div>
        <div className="flex-1">
          <label className="mb-1 block font-inter text-[0.65rem] font-semibold uppercase tracking-widest text-slate-400">
            Max $
          </label>
          <input
            type="number"
            min={priceRange.min}
            value={priceRange.max}
            onChange={(e) => setPriceRange(priceRange.min, Number(e.target.value))}
            className={inputClass}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Multi-check panel ──────────────────────────────────────── */
function MultiCheckPanel({ categoryId, selected, onChange }) {
  const options = FILTER_OPTIONS[categoryId] ?? [];
  return (
    <div className="px-1 pt-2 pb-1 flex flex-col gap-1.5">
      {options.map((opt) => (
        <CheckboxOption
          key={opt}
          label={opt}
          checked={selected.includes(opt)}
          onChange={onChange}
        />
      ))}
    </div>
  );
}

/* ─── Filter Sidebar ─────────────────────────────────────────── */
/**
 * Full filter sidebar — category navigation + context-sensitive filter panel + apply button.
 */
export default function FilterSidebar({
  activeCategory,
  pendingFilters,
  onCategoryClick,
  onToggleMulti,
  onPriceRange,
  onApply,
  onReset,
}) {
  return (
    <aside className="w-[228px] flex-shrink-0 flex flex-col">
      {/* Header */}
      <div className="mb-5 flex items-center gap-2.5 ">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50">
          <SlidersHorizontal size={13} className="text-blue-600" strokeWidth={2} />
        </div>
        <div>
          <h2 className="font-inter font-bold text-[0.9rem] text-slate-800">Filters</h2>
          <p className="font-inter text-[0.72rem] text-slate-400 leading-tight">Refine your search</p>
        </div>
      </div>

      {/* Category list */}
      <nav className="flex flex-col gap-0.5 mb-5">
        {FILTER_CATEGORIES.map((cat) => (
          <div key={cat.id}>
            <FilterCategory
              category={cat}
              isActive={activeCategory === cat.id}
              onClick={onCategoryClick}
            />
            {/* Expanded panel for the active category */}
            {activeCategory === cat.id && (
              <div className="mt-1 mb-2 ml-1 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 overflow-hidden">
                {cat.id === 'priceRange' ? (
                  <PriceRangePanel
                    priceRange={pendingFilters.priceRange}
                    setPriceRange={onPriceRange}
                  />
                ) : (
                  <MultiCheckPanel
                    categoryId={cat.id}
                    selected={pendingFilters[cat.id]}
                    onChange={(val) => onToggleMulti(cat.id, val)}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Divider */}
      <div className="h-px bg-slate-100 mb-4" />

      {/* Actions */}
      <div className="flex flex-col gap-2">
        <PrimaryButton onClick={onApply} size="md" className="w-full justify-center">
          Apply Filters
        </PrimaryButton>
        <button
          onClick={onReset}
          className="font-inter text-[0.8125rem] text-slate-400 hover:text-slate-700 text-center transition-colors duration-200 py-1"
        >
          Reset all filters
        </button>
      </div>
    </aside>
  );
}
