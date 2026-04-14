/**
 * A single filter category row in the sidebar.
 * Highlights with a primary left-border when active.
 */

const CATEGORY_ICONS = {
  priceRange:    (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  ),
  carType:       (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17H5a2 2 0 01-2-2v-4l3-6h10l3 6v4a2 2 0 01-2 2h-4m-4 0a2 2 0 104 0m-4 0a2 2 0 014 0" />
    </svg>
  ),
  brand:         (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path strokeLinecap="round" d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
    </svg>
  ),
  fuelType:      (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 22V9l6-7 6 7v13H3zm6-7v4m6-8h3a1 1 0 011 1v8a2 2 0 01-2 2h-2" />
    </svg>
  ),
  transmission:  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <circle cx="5" cy="6" r="2" /><circle cx="12" cy="6" r="2" /><circle cx="19" cy="6" r="2" />
      <circle cx="5" cy="18" r="2" /><circle cx="12" cy="18" r="2" />
      <path strokeLinecap="round" d="M5 8v8m7-8v8m7-8v4" />
    </svg>
  ),
};

export default function FilterCategory({ category, isActive, onClick }) {
  return (
    <button
      onClick={() => onClick(category.id)}
      className={[
        'w-full flex items-center gap-3 px-3 py-2.5 rounded-r-md text-left',
        'transition-colors duration-200 outline-none',
        'border-l-2',
        isActive
          ? 'border-primary text-primary bg-secondary-container/30'
          : 'border-transparent text-on-surface/55 hover:text-on-surface hover:bg-surface-container',
      ].join(' ')}
    >
      <span className={isActive ? 'text-primary' : 'text-on-surface/45'}>
        {CATEGORY_ICONS[category.id]}
      </span>
      <span className="font-inter text-[0.875rem] font-medium">{category.label}</span>
    </button>
  );
}
