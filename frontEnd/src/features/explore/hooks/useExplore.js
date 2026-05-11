import { useState, useEffect, useCallback, useMemo } from 'react';

import { getCars } from '../../../services/carService';

import { FILTER_CATEGORIES, FILTER_OPTIONS, SORT_OPTIONS, CARS_PER_PAGE } from '../data/exploreCars';

const API_BASE_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:5000').replace(/\/+$/, '');

const INITIAL_FILTERS = {
  priceRange: { min: 0, max: 1000 },
  location: '',
  carType: [],
  brand: [],
  transmission: [],
};

/** Batch size when paging through getAll until every active listing is loaded. */
const FETCH_PAGE_SIZE = 100;

/** Map rentalStatus to chip props for the card badge. */
function getChip(rentalStatus) {
  const s = (rentalStatus ?? '').toLowerCase();
  if (s === 'rented') return { chipLabel: 'Rented', chipVariant: 'rented' };
  if (s === 'reserved') return { chipLabel: 'Reserved', chipVariant: 'lowstock' };
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
  const pricePerDay = Number(c.rental_price);
  console.log('[mapCar] Car price:', c.rental_price, '->', pricePerDay, 'type:', typeof pricePerDay);
  return {
    id: c.post_id,
    name: c.title,
    year: String(c.year ?? ''),
    carType: c.car_type,
    brand: c.brand,
    model: c.model,
    transmission: c.transmission,
    location: c.location,
    pricePerDay: Number.isFinite(pricePerDay) ? pricePerDay : 0,
    rentalStatus: (c.rental_status ?? '').toLowerCase(),
    ownerName: c.owner_name,
    averageRating: c.average_rating ?? 0,
    chipLabel,
    chipVariant,
    image: normalizeImageUrl(c.primary_image_url),
  };
}

/**
 * True when a mapped car satisfies every applied constraint (AND across groups,
 * OR within multi-selects: type / brand / transmission).
 */
function carMatchesExploreFilters(car, filters) {
  let lo = Number(filters.priceRange.min);
  let hi = Number(filters.priceRange.max);
  if (!Number.isFinite(lo) || lo < 0) lo = 0;
  if (!Number.isFinite(hi) || hi <= 0) hi = Number.MAX_SAFE_INTEGER;
  if (lo > hi) [lo, hi] = [hi, lo];
  const price = car.pricePerDay;
  if (price < lo || price > hi) return false;

  const locQ = (filters.location ?? '').trim().toLowerCase();
  if (locQ && !(String(car.location ?? '').toLowerCase().includes(locQ))) return false;

  if (filters.carType.length > 0) {
    const ct = String(car.carType ?? '').toLowerCase();
    if (!filters.carType.some((t) => ct === String(t).toLowerCase())) return false;
  }

  if (filters.brand.length > 0) {
    const br = String(car.brand ?? '').toLowerCase();
    if (!filters.brand.some((t) => br === String(t).toLowerCase())) return false;
  }

  if (filters.transmission.length > 0) {
    const tr = String(car.transmission ?? '').toLowerCase();
    if (!filters.transmission.some((t) => tr === String(t).toLowerCase())) return false;
  }

  return true;
}

async function fetchAllActiveListings() {
  const aggregated = [];
  let page = 1;
  for (;;) {
    const data = await getCars({ page, pageSize: FETCH_PAGE_SIZE });
    const list = Array.isArray(data)
      ? data
      : (data?.cars ?? data?.results ?? data?.items ?? data?.data ?? []);
    const total = typeof data?.total === 'number' ? data.total : null;
    aggregated.push(...list);
    if (list.length === 0) break;
    if (list.length < FETCH_PAGE_SIZE) break;
    if (total != null && aggregated.length >= total) break;
    page += 1;
    if (page > 500) break;
  }
  return aggregated;
}

export function useExplore() {
  const [allCars, setAllCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeCategory, setActiveCategory] = useState('priceRange');
  const [pendingFilters, setPendingFilters] = useState(INITIAL_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(INITIAL_FILTERS);
  const [sort, setSort] = useState('recommended');
  const [currentPage, setCurrentPage] = useState(1);

  const loadListings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const rawList = await fetchAllActiveListings();
      setAllCars(rawList.map(mapCar));
    } catch (err) {
      console.error('Failed to fetch cars:', err);
      setError('Failed to load cars. Please try again.');
      setAllCars([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadListings();
  }, [loadListings]);

  const { pageCars, totalCount, totalPages } = useMemo(() => {
    let rows = allCars.filter((c) => carMatchesExploreFilters(c, appliedFilters));

    if (sort === 'price-asc') rows = [...rows].sort((a, b) => a.pricePerDay - b.pricePerDay);
    else if (sort === 'price-desc') rows = [...rows].sort((a, b) => b.pricePerDay - a.pricePerDay);

    const total = rows.length;
    const pages = Math.max(1, Math.ceil(total / CARS_PER_PAGE));
    const start = (currentPage - 1) * CARS_PER_PAGE;
    const pageCars = rows.slice(start, start + CARS_PER_PAGE);
    return { pageCars, totalCount: total, totalPages: pages };
  }, [allCars, appliedFilters, sort, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const toggleMultiFilter = (key, value) => {
    setPendingFilters((prev) => {
      const current = prev[key];
      const updated = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
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
    cars: pageCars,
    totalCount,
    isLoading,
    error,
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
