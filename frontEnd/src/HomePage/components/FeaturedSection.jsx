import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import MobilityCard from "./MobilityCard";
import { featuredCars } from "../Data";

function SectionHeader() {
  return (
    <div className="flex items-end justify-between mb-12">
      <div>
        <p className="font-body text-label-sm uppercase tracking-[0.05em] text-primary mb-3">
          Featured Fleet
        </p>
        <h2
          className="font-display font-bold text-on-surface"
          style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.015em" }}
        >
          Exceptional vehicles,<br />
          <span className="text-on-surface/50">verified local owners.</span>
        </h2>
      </div>
      <Link
        to="/renter-explore"
        className="hidden md:flex items-center gap-1.5 font-body text-body-md font-semibold text-primary no-underline hover:gap-2.5 transition-all duration-200"
      >
        View all cars
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}

export default function FeaturedSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="bg-surface-low py-20">
      <div className="max-w-screen-xl mx-auto px-8 lg:px-16">
        <SectionHeader />
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuredCars.map((car, i) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <MobilityCard car={car} />
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-10 text-center md:hidden">
          <Link
            to="/renter-explore"
            className="flex items-center justify-center gap-1.5 font-body text-body-md font-semibold text-primary no-underline"
          >
            View all cars <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
