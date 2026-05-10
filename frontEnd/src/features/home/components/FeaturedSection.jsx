import { Link } from "react-router-dom";
import CarCard from "./CarCard";
import { useFeaturedCars } from "../hooks/useFeaturedCars";

/**
 * Featured car listings grid section.
 * Background: surface (white) — sits above the background (#f4f6fb).
 */
export default function FeaturedSection() {
  const { cars, isLoading } = useFeaturedCars();

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
            to="/renter-explore"
            className="font-inter text-[0.875rem] font-semibold text-primary hover:text-primary-container transition-colors duration-200">
            View All Fleet →
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading ? (
            // Loading skeleton
            <>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-surface-bright rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-2/3" />
                    <div className="h-4 bg-gray-100 rounded w-1/2" />
                    <div className="h-10 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </>
          ) : cars.length > 0 ? (
            cars.map((car) => <CarCard key={car.id} car={car} />)
          ) : (
            <div className="col-span-3 text-center py-12 text-on-surface/50">
              No featured cars available at the moment.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
