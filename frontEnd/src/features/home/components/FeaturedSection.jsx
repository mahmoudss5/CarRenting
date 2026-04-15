import { Link } from 'react-router-dom';
import { FEATURED_CARS } from '../data/featuredCars';
import CarCard from './CarCard';

/**
 * Featured car listings grid section.
 * Background: surface (white) — sits above the background (#f4f6fb).
 */
export default function FeaturedSection() {
  return (
    <section className="bg-surface py-20">
      <div className="max-w-7xl mx-auto px-10">
        {/* Section header — asymmetric, editorial */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-inter text-label-sm font-bold tracking-[0.05em] uppercase text-on-surface/40 mb-2">
              The Collection
            </p>
            <h2 className="font-manrope font-semibold text-headline-sm text-on-surface">
              Featured Listings
            </h2>
          </div>
          <Link
            to="/signup"
            className="font-inter text-[0.875rem] font-semibold text-primary hover:text-primary-container transition-colors duration-200"
          >
            View All Fleet →
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_CARS.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
