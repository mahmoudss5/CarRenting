import FilterCategory from './FilterCategory';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import { FILTER_CATEGORIES, FILTER_OPTIONS } from '../data/exploreCars';

function CheckboxOption({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onChange(label)}
        className="w-3.5 h-3.5 accent-primary cursor-pointer"
      />
      <span className="font-inter text-[0.8125rem] text-on-surface/65 group-hover:text-on-surface transition-colors duration-150">
        {label}
      </span>
    </label>
  );
}

function PriceRangePanel({ priceRange, setPriceRange }) {
  return (
    <div className="px-3 pt-2 pb-3 flex flex-col gap-3">
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="font-inter text-label-sm tracking-[0.05em] uppercase text-on-surface/40 mb-1 block">
            Min $
          </label>
          <input
            type="number"
            min={0}
            max={priceRange.max}
            value={priceRange.min}
            onChange={(e) => setPriceRange(Number(e.target.value), priceRange.max)}
            className="w-full px-3 py-2 rounded-md text-sm font-inter text-on-surface bg-surface-container-highest outline-none focus:ring-1 focus:ring-primary/20 transition-all duration-200"
          />
        </div>
        <div className="flex-1">
          <label className="font-inter text-label-sm tracking-[0.05em] uppercase text-on-surface/40 mb-1 block">
            Max $
          </label>
          <input
            type="number"
            min={priceRange.min}
            value={priceRange.max}
            onChange={(e) => setPriceRange(priceRange.min, Number(e.target.value))}
            className="w-full px-3 py-2 rounded-md text-sm font-inter text-on-surface bg-surface-container-highest outline-none focus:ring-1 focus:ring-primary/20 transition-all duration-200"
          />
        </div>
      </div>
    </div>
  );
}

function MultiCheckPanel({ categoryId, selected, onChange }) {
  const options = FILTER_OPTIONS[categoryId] ?? [];
  return (
    <div className="px-3 pt-2 pb-3 flex flex-col gap-2">
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
    <aside className="w-[220px] flex-shrink-0 flex flex-col">
      {/* Header */}
      <div className="mb-5">
        <h2 className="font-manrope font-bold text-[1.1rem] text-on-surface">Filters</h2>
        <p className="font-inter text-body-md text-on-surface/45 mt-0.5">Refine your selection</p>
      </div>

      {/* Category list */}
      <nav className="flex flex-col gap-0.5 mb-4">
        {FILTER_CATEGORIES.map((cat) => (
          <div key={cat.id}>
            <FilterCategory
              category={cat}
              isActive={activeCategory === cat.id}
              onClick={onCategoryClick}
            />
            {/* Expanded panel for the active category */}
            {activeCategory === cat.id && (
              <div className="mt-1 mb-2 ml-1 rounded-md bg-surface-container-low overflow-hidden">
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

      {/* Actions */}
      <div className="mt-auto flex flex-col gap-2">
        <PrimaryButton onClick={onApply} size="md" className="w-full justify-center">
          Apply Filters
        </PrimaryButton>
        <button
          onClick={onReset}
          className="font-inter text-[0.8125rem] text-on-surface/45 hover:text-on-surface text-center transition-colors duration-200"
        >
          Reset all
        </button>
      </div>
    </aside>
  );
}
