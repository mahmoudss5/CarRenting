import { motion } from 'framer-motion';
import { ArrowRight, Shield, Star } from 'lucide-react';
import SearchBar from './SearchBar';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

export default function HeroSection({ values, onChange, onSearch }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(100deg, rgba(244,246,251,0.97) 35%, rgba(244,246,251,0.60) 60%, rgba(244,246,251,0.0) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full pt-28 pb-20 px-8 lg:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.p
              variants={fadeUp}
              className="font-body text-label-sm font-bold tracking-[0.05em] uppercase text-on-surface/45 mb-5"
            >
              The Collection
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="font-display font-bold text-on-surface leading-[1.08]"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', letterSpacing: '-0.02em' }}
            >
              Drive the<br />
              <span className="text-primary">Extraordinary.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-body text-body-md text-on-surface/60 mt-6 max-w-sm leading-relaxed"
            >
              Access a curated fleet of premium vehicles from trusted local
              owners. Experience the road, differently.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex items-center gap-5 mt-8"
            >
              {[
                { icon: Shield, text: "Fully Insured" },
                { icon: Star, text: "4.9★ Rated" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-on-surface/50 font-body text-sm">
                  <Icon size={14} strokeWidth={1.8} />
                  {text}
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <SearchBar values={values} onChange={onChange} onSearch={onSearch} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
