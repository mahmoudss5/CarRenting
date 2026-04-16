import { Car } from 'lucide-react';
import ExploreCarCard from './ExploreCarCard';

/**
 * Responsive 3-column grid of ExploreCarCards.
 * Shows an empty state when no cars match the active filters.
 */
export default function CarGrid({ cars }) {
  if (cars.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 border border-slate-200">
          <Car size={26} className="text-slate-300" strokeWidth={1.5} />
        </div>
        <p className="font-display font-bold text-[1.2rem] text-slate-300 mb-1.5">
          No vehicles found
        </p>
        <p className="font-inter text-[0.875rem] text-slate-400">
          Try adjusting your filters to see more results.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {cars.map((car) => (
        <ExploreCarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
