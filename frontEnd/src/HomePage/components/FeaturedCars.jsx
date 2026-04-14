import { featuredCars } from "../Data";
import CarCard from "./CarCard";

export default function FeaturedCars() {
  return (
    <section className="py-20 mb-12">
      <h2 className="text-3xl text-center font-bold mb-10" />

      <div className="max-w-7xl mx-auto px-8 grid grid-cols-3 gap-6">
        {featuredCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  );
}