import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import MobilityCard from "./MobilityCard";
import { useFeaturedCars } from "../../features/home/hooks/useFeaturedCars";

function SectionHeader() {
  return (
    <div className="flex items-end justify-between mb-12">
      <div>
        <p className="font-body text-label-sm uppercase tracking-[0.05em] text-primary mb-3">
          Featured Fleet
        </p>
        <h2
          className="font-display font-bold text-on-surface"
          style={{
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            letterSpacing: "-0.015em",
          }}>
          Exceptional vehicles,
          <br />
          <span className="text-on-surface/50">verified local owners.</span>
        </h2>
      </div>
      <Link
        to="/renter-explore"
        className="hidden md:flex items-center gap-1.5 font-body text-body-md font-semibold text-primary no-underline hover:gap-2.5 transition-all duration-200">
        View all cars
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}

export default function FeaturedSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { cars, isLoading } = useFeaturedCars();

  return (
    <section className="bg-surface-low py-20">
      <div className="max-w-screen-xl mx-auto px-8 lg:px-16">
        <SectionHeader />
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Loading skeleton
            <>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-surface-bright rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-2/3" />
                    <div className="h-4 bg-gray-100 rounded w-1/2" />
                    <div className="h-10 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </>
          ) : cars.length > 0 ? (
            cars.map((car, i) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}>
                <MobilityCard car={car} />
              </motion.div>
            ))
          ) : null}
        </motion.div>

        {!isLoading && cars.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16 px-8">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="font-manrope font-bold text-xl text-on-surface mb-3">
                No Cars Available
              </h3>
              <p className="font-inter text-body-md text-on-surface/60 mb-6">
                There are no cars available for rent at the moment. Check back
                soon as our fleet grows daily!
              </p>
              <Link
                to="/renter-explore"
                className="inline-flex items-center gap-2 font-inter text-body-md font-semibold text-primary hover:text-primary-container transition-colors">
                Browse all listings
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        )}
        <div className="mt-10 text-center md:hidden">
          <Link
            to="/renter-explore"
            className="flex items-center justify-center gap-1.5 font-body text-body-md font-semibold text-primary no-underline">
            View all cars <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
