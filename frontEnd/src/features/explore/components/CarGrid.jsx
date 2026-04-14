import ExploreCarCard from './ExploreCarCard';

/**
 * Responsive 3-column grid of ExploreCarCards.
 * Shows an empty state when no cars match the active filters.
 */
export default function CarGrid({ cars }) {
  if (cars.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="font-manrope font-bold text-headline-sm text-on-surface/30 mb-2">
          No vehicles found
        </p>
        <p className="font-inter text-body-md text-on-surface/40">
          Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <ExploreCarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
