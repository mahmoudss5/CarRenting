import PageLayout from '../../shared/layouts/PageLayout';
import FilterSidebar from './components/FilterSidebar';
import ExploreHeader from './components/ExploreHeader';
import CarGrid from './components/CarGrid';
import Pagination from './components/Pagination';
import { useExplore } from './hooks/useExplore';


export default function RenterExplorePage() {
  const {
    activeCategory,
    pendingFilters,
    sort,
    currentPage,
    totalPages,
    cars,
    totalCount,
    isLoading,
    error,
    setActiveCategory,
    toggleMultiFilter,
    setPriceRange,
    setLocation,
    applyFilters,
    resetFilters,
    setSort,
    goToPage,
  } = useExplore();

  return (
    <PageLayout>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
          <div className="flex gap-8">
            {/* ── Left: filter sidebar ── */}
            <div className="hidden md:block">
              {/* Sticky sidebar card */}
              <div className="sticky top-6 w-[260px] rounded-2xl border border-slate-200/80 bg-white shadow-[0_2px_16px_rgba(15,23,42,0.06)] px-4 py-5">
                <FilterSidebar
                  activeCategory={activeCategory}
                  pendingFilters={pendingFilters}
                  onCategoryClick={setActiveCategory}
                  onToggleMulti={toggleMultiFilter}
                  onPriceRange={setPriceRange}
                  onLocation={setLocation}
                  onApply={applyFilters}
                  onReset={resetFilters}
                />
              </div>
            </div>

            {/* ── Right: content area ── */}
            <main className="flex-1 min-w-0">
              <ExploreHeader
                totalCount={totalCount}
                sort={sort}
                onSortChange={setSort}
              />

              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
                  <div className="h-8 w-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
                  <p className="font-inter text-[0.875rem] text-slate-400">
                    Loading vehicles…
                  </p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-4">
                    <p className="font-inter text-[0.875rem] font-semibold text-red-700">{error}</p>
                  </div>
                </div>
              ) : (
                <CarGrid cars={cars} />
              )}

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
              />
            </main>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
