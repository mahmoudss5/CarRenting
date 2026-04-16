/**
 * A single filter category row in the sidebar.
 * Highlights with a primary left-border when active.
 */

const CATEGORY_ICONS = {
  priceRange: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-3.5 h-3.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  ),
  carType: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-3.5 h-3.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17H5a2 2 0 01-2-2v-4l3-6h10l3 6v4a2 2 0 01-2 2h-4m-4 0a2 2 0 104 0m-4 0a2 2 0 014 0" />
    </svg>
  ),
  brand: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-3.5 h-3.5">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path strokeLinecap="round" d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
    </svg>
  ),
  fuelType: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-3.5 h-3.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 22V9l6-7 6 7v13H3zm6-7v4m6-8h3a1 1 0 011 1v8a2 2 0 01-2 2h-2" />
    </svg>
  ),
  transmission: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-3.5 h-3.5">
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
        'w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left',
        'transition-all duration-200 outline-none',
        isActive
          ? 'bg-blue-50 text-blue-700 font-semibold ring-1 ring-blue-100'
          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50',
      ].join(' ')}
    >
      <span className={[
        'flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md transition-colors',
        isActive ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200',
      ].join(' ')}>
        {CATEGORY_ICONS[category.id]}
      </span>
      <span className="font-inter text-[0.8375rem]">{category.label}</span>
      {isActive && (
        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
      )}
    </button>
  );
}
