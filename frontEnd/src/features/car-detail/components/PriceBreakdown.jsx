const fmt = (n) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function LineItem({ label, value, isTotal = false }) {
  return (
    <div
      className={[
        'flex items-center justify-between py-2',
        isTotal
          ? 'border-t border-outline-variant/20 mt-1 pt-3'
          : '',
      ].join(' ')}
    >
      <span
        className={`font-inter text-[0.875rem] ${
          isTotal
            ? 'font-bold text-on-surface'
            : 'text-on-surface/60'
        }`}
      >
        {label}
      </span>
      <span
        className={
          isTotal
            ? 'font-manrope font-extrabold text-[1.2rem] text-primary'
            : 'font-inter font-semibold text-on-surface/80 text-[0.875rem]'
        }
      >
        {value}
      </span>
    </div>
  );
}

/**
 * Price breakdown table — no dividers except a single ghost line before Total.
 */
export default function PriceBreakdown({ booking }) {
  const { numDays, subtotal, serviceFee, insurance, total, startDate } = booking;
  const dailyRate = subtotal / numDays;

  return (
    <div className="mt-4 flex flex-col">
      <LineItem
        label={`${numDays} day${numDays > 1 ? 's' : ''} × ${fmt(dailyRate)}`}
        value={fmt(subtotal)}
      />
      <LineItem label="Platform Service Fee" value={fmt(serviceFee)} />
      <LineItem label="Insurance (Premium Coverage)" value={fmt(insurance)} />
      <LineItem label="Total Amount" value={fmt(total)} isTotal />
    </div>
  );
}
