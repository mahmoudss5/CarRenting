import { Link } from "react-router-dom";
import MobilityCard from "./MobilityCard";
import { featuredCars } from "../Data";

function SectionHeader() {
  return (
    <div className="flex items-end justify-between mb-12">
      <div>
        <p className="font-body text-label-sm uppercase tracking-[0.05em] text-primary mb-3">
          Featured Fleet
        </p>
        <h2 className="font-display font-bold text-on-surface" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.015em" }}>
          Exceptional vehicles,<br />
          <span className="text-on-surface/50">verified local owners.</span>
        </h2>
      </div>
      <Link
        to="/signup"
        className="hidden md:block font-body text-body-md font-semibold text-primary no-underline hover:underline underline-offset-4"
      >
        View all cars →
      </Link>
    </div>
  );
}

export default function FeaturedSection() {
  return (
    <section className="bg-surface-low py-20">
      <div className="max-w-screen-xl mx-auto px-8 lg:px-16">
        <SectionHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCars.map((car) => (
            <MobilityCard key={car.id} car={car} />
          ))}
        </div>
        <div className="mt-10 text-center md:hidden">
          <Link
            to="/signup"
            className="font-body text-body-md font-semibold text-primary no-underline hover:underline underline-offset-4"
          >
            View all cars →
          </Link>
        </div>
      </div>
    </section>
  );
}
