import { GRADIENT_PRIMARY } from '../../../design/tokens';

function PageButton({ label, onClick, isActive, disabled, ariaLabel }) {
  if (isActive) {
    return (
      <button
        aria-label={ariaLabel ?? String(label)}
        aria-current="page"
        onClick={onClick}
        className="flex h-9 w-9 items-center justify-center rounded-xl font-inter font-semibold text-sm text-white shadow-[0_2px_10px_rgba(0,61,155,0.30)] transition-transform duration-150 hover:scale-105"
        style={{ background: GRADIENT_PRIMARY }}
      >
        {label}
      </button>
    );
  }

  return (
    <button
      aria-label={ariaLabel ?? String(label)}
      onClick={onClick}
      disabled={disabled}
      className={[
        'flex h-9 w-9 items-center justify-center rounded-xl font-inter text-sm font-medium border transition-all duration-200',
        disabled
          ? 'border-transparent text-slate-300 cursor-not-allowed'
          : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 cursor-pointer shadow-sm',
      ].join(' ')}
    >
      {label}
    </button>
  );
}

/**
 * Pagination row — ← page buttons → .
 * Renders up to 3 page buttons; extend for larger datasets.
 */
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-1.5 mt-14"
    >
      <PageButton
        label="←"
        ariaLabel="Previous page"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />

      {pages.map((page) => (
        <PageButton
          key={page}
          label={page}
          onClick={() => onPageChange(page)}
          isActive={page === currentPage}
        />
      ))}

      <PageButton
        label="→"
        ariaLabel="Next page"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </nav>
  );
}
