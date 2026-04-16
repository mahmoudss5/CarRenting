import { useState, useEffect, useCallback, useMemo } from 'react';
import { searchCars } from '../../../services/carService';
import { FILTER_CATEGORIES, FILTER_OPTIONS, SORT_OPTIONS, CARS_PER_PAGE } from '../data/exploreCars';

const INITIAL_FILTERS = {
  priceRange: { min: 0, max: 1000 },
  carType: [],
  brand: [],
  transmission: [],
};

/** Map a backend car list item to the shape the UI components expect. */
function mapCar(c) {
  return {
    id: c.post_id,
    name: c.title,
    year: String(c.year ?? ''),
    carType: c.car_type,
    brand: c.brand,
    model: c.model,
    transmission: c.transmission,
    location: c.location,
    pricePerDay: Number(c.rental_price),
    rentalStatus: c.rental_status,
    ownerName: c.owner_name,
    averageRating: c.average_rating ?? 0,
    image: null,
  };
}

export function useExplore() {
  const [cars, setCars] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeCategory, setActiveCategory] = useState('priceRange');
  const [pendingFilters, setPendingFilters] = useState(INITIAL_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(INITIAL_FILTERS);
  const [sort, setSort] = useState('recommended');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCars = useCallback(async (filters, page) => {
    setIsLoading(true);
    setError(null);
    try {
      const params = {
        page,
        pageSize: CARS_PER_PAGE,
        minPrice: filters.priceRange.min > 0 ? filters.priceRange.min : undefined,
        maxPrice: filters.priceRange.max < 1000 ? filters.priceRange.max : undefined,
        type: filters.carType.length === 1 ? filters.carType[0] : undefined,
        brand: filters.brand.length === 1 ? filters.brand[0] : undefined,
        transmission: filters.transmission.length === 1 ? filters.transmission[0] : undefined,
      };
      const data = await searchCars(params);
      const list = Array.isArray(data) ? data : (data?.items ?? data?.data ?? []);
      setCars(list.map(mapCar));
      setTotalCount(data?.total ?? list.length);
    } catch (err) {
      console.error('Failed to fetch cars:', err);
      setError('Failed to load cars. Please try again.');
      setCars([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCars(appliedFilters, currentPage);
  }, [fetchCars, appliedFilters, currentPage]);

  // Client-side sort of the current page result
  const sortedCars = useMemo(() => {
    const copy = [...cars];
    if (sort === 'price-asc') copy.sort((a, b) => a.pricePerDay - b.pricePerDay);
    if (sort === 'price-desc') copy.sort((a, b) => b.pricePerDay - a.pricePerDay);
    return copy;
  }, [cars, sort]);

  const totalPages = Math.max(1, Math.ceil(totalCount / CARS_PER_PAGE));

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

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return {
    activeCategory,
    pendingFilters,
    sort,
    currentPage,
    totalPages,
    cars: sortedCars,
    totalCount,
    isLoading,
    error,
    // Re-export static metadata so FilterSidebar still works
    filterCategories: FILTER_CATEGORIES,
    filterOptions: FILTER_OPTIONS,
    sortOptions: SORT_OPTIONS,
    setActiveCategory,
    toggleMultiFilter,
    setPriceRange,
    applyFilters,
    resetFilters,
    setSort,
    goToPage,
  };
}
