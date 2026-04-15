import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Star, Zap } from "lucide-react";
import PrimaryButton from "../../components/ui/PrimaryButton";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

function HeroBadge() {
  return (
    <motion.span
      variants={fadeUp}
      className="inline-flex items-center gap-2 bg-white/10 text-white rounded-full px-4 py-1.5 font-body text-label-sm uppercase tracking-[0.05em] mb-8 border border-white/20 backdrop-blur-sm"
    >
      <Zap size={12} className="text-yellow-300" fill="currentColor" />
      Premium Mobility Platform
    </motion.span>
  );
}

function TrustBadges() {
  const badges = [
    { icon: Shield, text: "Fully Insured" },
    { icon: Star, text: "4.9★ Rated" },
  ];
  return (
    <motion.div variants={fadeUp} className="flex items-center gap-4 mt-8">
      {badges.map(({ icon: Icon, text }) => (
        <div
          key={text}
          className="flex items-center gap-1.5 text-white/60 font-body text-label-sm"
        >
          <Icon size={14} className="text-white/50" />
          {text}
        </div>
      ))}
    </motion.div>
  );
}

function HeroCTA() {
  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-10"
    >
      <Link to="/signup" className="no-underline w-full sm:w-auto">
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <PrimaryButton fullWidth={false} className="px-10 py-4 text-base">
            Browse the Fleet
          </PrimaryButton>
        </motion.div>
      </Link>
      <Link
        to="/#how-it-works"
        className="flex items-center gap-2 font-body text-title-md text-white/60 hover:text-white no-underline transition-colors group"
      >
        How it Works
        <ArrowRight
          size={16}
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      </Link>
    </motion.div>
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
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-8 lg:px-20 min-h-screen flex flex-col justify-center pt-24 pb-16">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-[600px]"
        >
          <HeroBadge />
          <motion.h1
            variants={fadeUp}
            className="font-display font-bold leading-[1.04] tracking-[-0.02em] text-white"
            style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)" }}
          >
            Drive the Car<br />
            <span style={{ color: "#7aadff" }}>You Deserve.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="font-body text-body-md text-white/55 mt-6 max-w-[440px] leading-relaxed"
          >
            Access a curated fleet of premium vehicles from verified local
            owners. Effortless, insured, and entirely yours.
          </motion.p>
          <HeroCTA />
          <TrustBadges />
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent pointer-events-none" />
    </section>
  );
}
