import { useState, useMemo } from 'react';
import { EXPLORE_CARS, CARS_PER_PAGE } from '../data/exploreCars';

const INITIAL_FILTERS = {
  priceRange: { min: 0, max: 1000 },
  carType: [],
  brand: [],
  fuelType: [],
  transmission: [],
};

/**
 * Manages all Explore page state: filter selections, sort order, and pagination.
 * Returns derived car list — components never touch raw data directly.
 */
export function useExplore() {
  const [activeCategory, setActiveCategory] = useState('priceRange');
  const [pendingFilters, setPendingFilters] = useState(INITIAL_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(INITIAL_FILTERS);
  const [sort, setSort] = useState('recommended');
  const [currentPage, setCurrentPage] = useState(1);

  // --- Filter mutation helpers ---
  const toggleMultiFilter = (key, value) => {
    setPendingFilters((prev) => {
      const current = prev[key];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: updated };
    });
  };

  const setPriceRange = (min, max) => {
    setPendingFilters((prev) => ({ ...prev, priceRange: { min, max } }));
  };

  const applyFilters = () => {
    setAppliedFilters(pendingFilters);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setPendingFilters(INITIAL_FILTERS);
    setAppliedFilters(INITIAL_FILTERS);
    setCurrentPage(1);
  };

  // --- Derived list: filter → sort → paginate ---
  const filteredSorted = useMemo(() => {
    let result = EXPLORE_CARS.filter((car) => {
      const { priceRange, carType, brand, fuelType, transmission } = appliedFilters;

      if (car.pricePerDay < priceRange.min || car.pricePerDay > priceRange.max)
        return false;
      if (carType.length > 0 && !carType.includes(car.carType)) return false;
      if (brand.length > 0 && !brand.includes(car.brand)) return false;
      if (fuelType.length > 0 && !fuelType.includes(car.fuelType)) return false;
      if (transmission.length > 0 && !transmission.includes(car.transmission))
        return false;

      return true;
    });

    if (sort === 'price-asc') result.sort((a, b) => a.pricePerDay - b.pricePerDay);
    if (sort === 'price-desc') result.sort((a, b) => b.pricePerDay - a.pricePerDay);

    return result;
  }, [appliedFilters, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / CARS_PER_PAGE));

  const paginatedCars = useMemo(() => {
    const start = (currentPage - 1) * CARS_PER_PAGE;
    return filteredSorted.slice(start, start + CARS_PER_PAGE);
  }, [filteredSorted, currentPage]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return {
    // State
    activeCategory,
    pendingFilters,
    sort,
    currentPage,
    totalPages,
    // Derived
    cars: paginatedCars,
    totalCount: filteredSorted.length,
    // Handlers
    setActiveCategory,
    toggleMultiFilter,
    setPriceRange,
    applyFilters,
    resetFilters,
    setSort,
    goToPage,
  };
}
