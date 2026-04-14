import { Link } from "react-router-dom";
import PrimaryButton from "../../components/ui/PrimaryButton";

function HeroBadge() {
  return (
    <span className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 font-body text-label-sm uppercase tracking-[0.05em] mb-8">
      <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
      Premium Mobility Platform
    </span>
  );
}

function HeroCTA() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-10">
      <Link to="/signup" className="no-underline w-full sm:w-auto">
        <PrimaryButton fullWidth={false} className="px-10 py-4 text-base">
          Browse the Fleet
        </PrimaryButton>
      </Link>
      <Link
        to="/#how-it-works"
        className="font-body text-title-md text-on-surface/60 hover:text-on-surface no-underline transition-colors"
      >
        How it Works →
      </Link>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-on-surface">
      <img
        src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=80"
        alt="Premium sports car"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-hero-vignette" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-8 lg:px-20 min-h-screen flex flex-col justify-center pt-24 pb-16">
        <div className="max-w-[580px]">
          <HeroBadge />
          <h1 className="font-display font-bold leading-[1.04] tracking-[-0.02em] text-white"
            style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
            Drive the Car<br />
            <span style={{ color: "#7aadff" }}>You Deserve.</span>
          </h1>
          <p className="font-body text-body-md text-white/55 mt-6 max-w-[420px] leading-relaxed">
            Access a curated fleet of premium vehicles from verified local
            owners. Effortless, insured, and entirely yours.
          </p>
          <HeroCTA />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent pointer-events-none" />
    </section>
  );
}
