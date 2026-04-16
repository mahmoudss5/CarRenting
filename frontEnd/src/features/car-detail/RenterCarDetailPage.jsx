import PageLayout from '../../shared/layouts/PageLayout';
import CarDetailHeader from './components/CarDetailHeader';
import CarGallery from './components/CarGallery';
import CarSpecsGrid from './components/CarSpecsGrid';
import CarDescription from './components/CarDescription';
import OwnerCard from './components/OwnerCard';
import ReviewsSection from './components/ReviewsSection';
import BookingCard from './components/BookingCard';
import RentalRequestModal from './components/RentalRequestModal';
import { useCarDetail } from './hooks/useCarDetail';

/**
 * Car Detail page — purely compositional.
 * Two-column: left scrollable content + right sticky booking card.
 */
export default function RenterCarDetailPage() {
  const { car, isLoadingCar, carError, booking, handlers, modal } = useCarDetail();

  if (isLoadingCar) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="font-body text-on-surface/50 text-lg">Loading car details…</p>
        </div>
      </PageLayout>
    );
  }

  if (carError || !car) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="font-body text-red-500 text-lg">{carError ?? 'Car not found.'}</p>
        </div>
      </PageLayout>
    );
  }

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
      <RentalRequestModal car={car} booking={booking} {...modal} />
    </PageLayout>
  );
}
