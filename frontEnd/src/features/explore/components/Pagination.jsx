import { GRADIENT_PRIMARY } from '../../../design/tokens';

function PageButton({ label, onClick, isActive, disabled, ariaLabel }) {
  if (isActive) {
    return (
      <button
        aria-label={ariaLabel ?? String(label)}
        aria-current="page"
        onClick={onClick}
        className="w-10 h-10 rounded-md font-inter font-semibold text-sm text-white flex items-center justify-center"
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
        'w-10 h-10 rounded-md font-inter text-sm font-medium flex items-center justify-center transition-colors duration-200',
        disabled
          ? 'text-on-surface/25 cursor-not-allowed'
          : 'text-on-surface/60 hover:bg-surface-container hover:text-on-surface cursor-pointer',
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
      className="flex items-center justify-center gap-1 mt-12"
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
