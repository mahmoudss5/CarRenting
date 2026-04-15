import SearchBar from './SearchBar';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80';

/**
 * Full-viewport hero section.
 * Bleeds under the fixed glass navbar intentionally.
 * Content has pt-28 to avoid being hidden by the navbar.
 */
export default function HeroSection({ values, onChange, onSearch }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background car image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
        aria-hidden="true"
      />

      {/* Editorial gradient overlay: opaque white left → transparent right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(100deg, rgba(244,246,251,0.97) 35%, rgba(244,246,251,0.60) 60%, rgba(244,246,251,0.0) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content — asymmetric left margin per design system spec */}
      <div className="relative z-10 w-full pt-28 pb-20 pl-20 pr-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 gap-16 items-center">
          {/* Left: editorial headline */}
          <div>
            <p className="font-inter text-label-sm font-bold tracking-[0.05em] uppercase text-on-surface/45 mb-5">
              The Collection
            </p>

            <h1
              className="font-manrope font-bold text-on-surface leading-[1.08]"
              style={{ fontSize: '3.5rem', letterSpacing: '-0.02em' }}
            >
              Drive the
              <br />
              <span className="text-primary">Extraordinary.</span>
            </h1>

            <p className="font-inter text-body-md text-on-surface/60 mt-6 max-w-sm leading-relaxed">
              Access a curated fleet of premium vehicles from trusted local
              owners. Experience the road, differently.
            </p>
          </div>

          {/* Right: glass search card */}
          <SearchBar values={values} onChange={onChange} onSearch={onSearch} />
        </div>
      </div>
    </section>
  );
}
