import PageLayout from '../../shared/layouts/PageLayout';
import CarDetailHeader from './components/CarDetailHeader';
import CarGallery from './components/CarGallery';
import CarSpecsGrid from './components/CarSpecsGrid';
import CarDescription from './components/CarDescription';
import OwnerCard from './components/OwnerCard';
import ReviewsSection from './components/ReviewsSection';
import BookingCard from './components/BookingCard';
import { useCarDetail } from './hooks/useCarDetail';

/**
 * Car Detail page — purely compositional.
 * Two-column: left scrollable content + right sticky booking card.
 */
export default function RenterCarDetailPage() {
  const { car, booking, handlers } = useCarDetail();

  return (
    <PageLayout>
      <div className="bg-surface min-h-screen">
        <div className="max-w-7xl mx-auto px-10 py-10">
          {/* Full-width header */}
          <CarDetailHeader car={car} />

          {/* Two-column layout */}
          <div className="grid grid-cols-[1fr_340px] gap-10 mt-2">
            {/* Left: content */}
            <div>
              <CarGallery car={car} />
              <CarSpecsGrid car={car} />
              <CarDescription car={car} />
              <OwnerCard owner={car.owner} />
              <ReviewsSection
                reviews={car.reviews}
                avgRating={car.avgRating}
                reviewCount={car.reviewCount}
              />
              {/* Bottom padding so last section doesn't clip */}
              <div className="pb-16" />
            </div>

            {/* Right: sticky booking card */}
            <div>
              <BookingCard car={car} booking={booking} handlers={handlers} />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
