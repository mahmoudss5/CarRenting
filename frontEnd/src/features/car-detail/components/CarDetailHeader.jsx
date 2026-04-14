import StatusChip from '../../../shared/components/StatusChip';

/**
 * Car name headline — uses editorial mixed-weight typography.
 * "Porsche 911" in Manrope bold + "Carrera" in italic primary.
 */
export default function CarDetailHeader({ car }) {
  return (
    <div className="flex items-start gap-4 flex-wrap">
      <h1
        className="font-manrope font-bold text-on-surface leading-tight"
        style={{ fontSize: '2.5rem', letterSpacing: '-0.02em' }}
      >
        {car.name}{' '}
        <em className="text-primary not-italic font-light"
            style={{ fontStyle: 'italic', fontWeight: 300 }}>
          {car.variant}
        </em>
      </h1>
      {car.chipLabel && (
        <div className="mt-3">
          <StatusChip label={car.chipLabel} variant={car.chipVariant} />
        </div>
      )}
    </div>
  );
}
