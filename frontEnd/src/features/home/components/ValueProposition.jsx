import PrimaryButton from '../../../shared/components/PrimaryButton';
import StatusChip from '../../../shared/components/StatusChip';

const RENTER_BENEFITS = [
  'Premium Insurance Coverage',
  '24/7 Roadside Assistance',
  'Verified Host Ratings',
];

const OWNER_BENEFITS = [
  'Earn up to $5,000/mo',
  'Monthly Payouts',
  'Fully Insured',
];

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-primary flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function BenefitItem({ text }) {
  return (
    <li className="flex items-center gap-3">
      <CheckIcon />
      <span className="font-inter text-body-md text-on-surface/70">{text}</span>
    </li>
  );
}

/**
 * Value proposition section — two-column card layout.
 * Background: surface-container-low to separate from adjacent white sections.
 */
export default function ValueProposition() {
  return (
    <section className="bg-surface-container-low py-24">
      <div className="max-w-7xl mx-auto px-10">
        {/* Centered headline */}
        <div className="text-center mb-14">
          <p className="font-inter text-label-sm font-bold tracking-[0.05em] uppercase text-on-surface/40 mb-3">
            The Experience
          </p>
          <h2
            className="font-manrope font-bold text-on-surface"
            style={{ fontSize: '2.5rem', letterSpacing: '-0.015em' }}
          >
            Simple. Secure. Sophisticated.
          </h2>
        </div>

        {/* Two-column value cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Renter card — light */}
          <div className="bg-surface rounded-xl p-8" style={{ boxShadow: '0 2px 16px rgba(20,27,44,0.06)' }}>
            <StatusChip label="For Renters" variant="electric" />
            <h3 className="font-manrope font-bold text-headline-sm text-on-surface mt-5 mb-2">
              Find your perfect match
            </h3>
            <p className="font-inter text-body-md text-on-surface/55 mb-6">
              Browse thousands of vehicles, book in seconds, and unlock your
              next adventure with keyless access.
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {RENTER_BENEFITS.map((b) => (
                <BenefitItem key={b} text={b} />
              ))}
            </ul>
            <PrimaryButton to="/signup">Rent a Car</PrimaryButton>
          </div>

          {/* Owner card — primary gradient background */}
          <div
            className="rounded-xl p-8 text-white"
            style={{ background: 'linear-gradient(155deg, #003d9b 0%, #0052cc 100%)' }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-label-sm font-bold tracking-[0.05em] uppercase bg-white/15 text-white">
              For Owners
            </span>
            <h3 className="font-manrope font-bold text-headline-sm text-white mt-5 mb-2">
              Turn your asset into income
            </h3>
            <p className="font-inter text-body-md text-white/70 mb-6">
              List your car and earn up to $5,000/mo. We handle the paperwork
              and insurance.
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {OWNER_BENEFITS.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-white/80 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-inter text-body-md text-white/80">{b}</span>
                </li>
              ))}
            </ul>
            <button
              className="px-6 py-3 rounded-md font-semibold text-primary bg-white hover:bg-white/90 transition-all duration-200 text-[0.9375rem]"
            >
              Become a Car Owner
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
