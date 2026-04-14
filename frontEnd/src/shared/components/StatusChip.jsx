/**
 * Status / label chip — always full-round (pill shape).
 * variant: 'verified' | 'pending' | 'electric' | 'performance' | 'suv' | 'luxury'
 */

const VARIANT_CLASSES = {
  verified:    'bg-secondary-container text-on-secondary-container',
  electric:    'bg-secondary-container text-on-secondary-container',
  performance: 'bg-tertiary-fixed text-tertiary',
  pending:     'bg-tertiary-fixed text-tertiary',
  suv:         'bg-[#e6f4ea] text-[#1b5e20]',
  luxury:      'bg-[#ede7f6] text-[#4527a0]',
};

export default function StatusChip({ label, variant = 'verified' }) {
  const variantClass = VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.verified;

  return (
    <span
      className={[
        'inline-flex items-center px-3 py-1',
        'rounded-full text-label-sm font-bold tracking-[0.05em] uppercase',
        variantClass,
      ].join(' ')}
    >
      {label}
    </span>
  );
}
