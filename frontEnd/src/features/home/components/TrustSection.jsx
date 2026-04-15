const TRUST_IMAGE =
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80';

const TRUST_PILLARS = [
  {
    id: 'screening',
    icon: '🔍',
    title: 'Rigorous Screening',
    description:
      'Every owner and renter undergoes a comprehensive background and identity check for your peace of mind.',
  },
  {
    id: 'support',
    icon: '🛎',
    title: 'Concierge Support',
    description:
      'Our dedicated mobility team is available 24/7 to assist with bookings, roadside events, or general inquiries.',
  },
];

function TrustPillar({ icon, title, description }) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center flex-shrink-0 text-lg">
        {icon}
      </div>
      <div>
        <h4 className="font-manrope font-semibold text-title-md text-on-surface mb-1">
          {title}
        </h4>
        <p className="font-inter text-body-md text-on-surface/55 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

/**
 * Trust section — asymmetric image-left, text-right layout.
 * Background: surface (white), between surface-container-low sections.
 */
export default function TrustSection() {
  return (
    <section className="bg-surface py-24">
      <div className="max-w-7xl mx-auto px-10">
        <div className="grid grid-cols-2 gap-16 items-center">
          {/* Left: editorial image — intentional bleed feel */}
          <div className="rounded-xl overflow-hidden aspect-[4/3]">
            <img
              src={TRUST_IMAGE}
              alt="Trusted car owner handing over keys"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Right: copy */}
          <div>
            <p className="font-inter text-label-sm font-bold tracking-[0.05em] uppercase text-on-surface/40 mb-4">
              Our Promise
            </p>
            <h2
              className="font-manrope font-bold text-on-surface mb-8"
              style={{ fontSize: '2.25rem', letterSpacing: '-0.015em', lineHeight: '1.2' }}
            >
              Built on Trust,
              <br />
              Driven by Community
            </h2>

            <div className="flex flex-col gap-8">
              {TRUST_PILLARS.map((pillar) => (
                <TrustPillar key={pillar.id} {...pillar} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
