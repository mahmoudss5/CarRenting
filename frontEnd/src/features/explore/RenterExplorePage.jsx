import PageLayout from '../../shared/layouts/PageLayout';
import FilterSidebar from './components/FilterSidebar';
import ExploreHeader from './components/ExploreHeader';
import CarGrid from './components/CarGrid';
import Pagination from './components/Pagination';
import { useExplore } from './hooks/useExplore';

/**
 * Explore / Browse All Posts page.
 * Purely compositional — all logic comes from useExplore.
 */
export default function RenterExplorePage() {
  const {
    activeCategory,
    pendingFilters,
    sort,
    currentPage,
    totalPages,
    cars,
    totalCount,
    setActiveCategory,
    toggleMultiFilter,
    setPriceRange,
    applyFilters,
    resetFilters,
    setSort,
    goToPage,
  } = useExplore();

  return (
    <PageLayout>
      <div className="bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-10 py-12">
          <div className="flex gap-12">
            {/* Left: filter sidebar */}
            <FilterSidebar
              activeCategory={activeCategory}
              pendingFilters={pendingFilters}
              onCategoryClick={setActiveCategory}
              onToggleMulti={toggleMultiFilter}
              onPriceRange={setPriceRange}
              onApply={applyFilters}
              onReset={resetFilters}
            />

            {/* Right: content area */}
            <main className="flex-1 min-w-0">
              <ExploreHeader
                totalCount={totalCount}
                sort={sort}
                onSortChange={setSort}
              />

              <CarGrid cars={cars} />

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
