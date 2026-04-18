import { useState, useEffect, useCallback, useMemo } from 'react';
import { searchCars } from '../../../services/carService';
import { FILTER_CATEGORIES, FILTER_OPTIONS, SORT_OPTIONS, CARS_PER_PAGE } from '../data/exploreCars';

const API_BASE_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:5000').replace(/\/+$/, '');

const INITIAL_FILTERS = {
  priceRange: { min: 0, max: 1000 },
  location: '',
  carType: [],
  brand: [],
  transmission: [],
};

/** Map rentalStatus to chip props for the card badge. */
function getChip(rentalStatus) {
  const s = (rentalStatus ?? '').toLowerCase();
  if (s === 'rented')    return { chipLabel: 'Rented',    chipVariant: 'rented'    };
  if (s === 'reserved')  return { chipLabel: 'Reserved',  chipVariant: 'lowstock'  };
  return { chipLabel: null, chipVariant: null };
}

function normalizeImageUrl(url) {
  if (!url) {
    console.log('[normalizeImageUrl - useExplore] URL is empty or null:', url);
    return null;
  }
  if (/^https?:\/\//i.test(url) || url.startsWith('data:') || url.startsWith('blob:')) {
    console.log('[normalizeImageUrl - useExplore] URL is absolute/data:', url);
    return url;
  }
  const computed = url.startsWith('/') ? `${API_BASE_URL}${url}` : `${API_BASE_URL}/${url}`;
  console.log(`[normalizeImageUrl - useExplore] Original: "${url}" -> Computed: "${computed}" (API_BASE_URL: ${API_BASE_URL})`);
  return computed;
}

/** Map a backend car list item to the shape the UI components expect. */
function mapCar(c) {
  const { chipLabel, chipVariant } = getChip(c.rental_status);
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
    rentalStatus: (c.rental_status ?? '').toLowerCase(),
    ownerName: c.owner_name,
    averageRating: c.average_rating ?? 0,
    chipLabel,
    chipVariant,
    image: normalizeImageUrl(c.primary_image_url),
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
        location: filters.location.trim() || undefined,
        // note: backend CarSearchQueryDto has no transmission field — filtered client-side
      };
      const data = await searchCars(params);
      // SearchAsync returns { results: [...], total }
      // GetActiveListingsAsync returns { cars: [...], total, page }
      const list = Array.isArray(data)
        ? data
        : (data?.results ?? data?.cars ?? data?.items ?? data?.data ?? []);
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

  // Client-side sort + transmission filter (backend doesn't accept transmission param)
  const sortedCars = useMemo(() => {
    let result = [...cars];
    if (appliedFilters.transmission.length > 0) {
      result = result.filter((c) =>
        appliedFilters.transmission.some(
          (t) => t.toLowerCase() === (c.transmission ?? '').toLowerCase()
        )
      );
    }
    if (sort === 'price-asc')  result.sort((a, b) => a.pricePerDay - b.pricePerDay);
    if (sort === 'price-desc') result.sort((a, b) => b.pricePerDay - a.pricePerDay);
    return result;
  }, [cars, sort, appliedFilters.transmission]);

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

  const setLocation = (value) => {
    setPendingFilters((prev) => ({ ...prev, location: value }));
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
    setLocation,
    applyFilters,
    resetFilters,
    setSort,
    goToPage,
  };
}
