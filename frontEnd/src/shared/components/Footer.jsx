/**
 * Global footer — surface-dim background for visual "grounding".
 * Four-column layout: Brand | Platform | Legal | Newsletter.
 */
export default function Footer() {
  const platformLinks = ['Help Center', 'Fleet Solutions', 'Pricing'];
  const legalLinks = ['Privacy Policy', 'Terms of Service', 'Cookie Policy'];

  return (
    <footer className="bg-surface-dim px-16 pt-12 pb-6">
      <div className="max-w-7xl mx-auto">
        {/* Top columns */}
        <div className="grid grid-cols-4 gap-12 mb-10">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="font-manrope font-extrabold text-[1.1rem] text-on-surface mb-3">
              Drive<span className="text-primary">Share</span>
            </h3>
            <p className="font-inter text-body-md text-on-surface/55 leading-relaxed">
              Premium car sharing for the modern explorer. Redefining mobility one journey at a time.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-inter text-label-sm font-bold tracking-[0.05em] uppercase text-on-surface/50 mb-4">
              Platform
            </h4>
            <ul className="flex flex-col gap-2.5">
              {platformLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-inter text-body-md text-on-surface/60 hover:text-primary transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-inter text-label-sm font-bold tracking-[0.05em] uppercase text-on-surface/50 mb-4">
              Legal
            </h4>
            <ul className="flex flex-col gap-2.5">
              {legalLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-inter text-body-md text-on-surface/60 hover:text-primary transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-inter text-label-sm font-bold tracking-[0.05em] uppercase text-on-surface/50 mb-4">
              Newsletter
            </h4>
            <p className="font-inter text-body-md text-on-surface/55 mb-4">
              Stay ahead of the fleet.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                aria-label="Newsletter email"
                className="flex-1 px-4 py-2.5 rounded-md text-sm font-inter text-on-surface bg-surface-container-highest outline-none focus:ring-1 focus:ring-primary/20 transition-all duration-200"
              />
              <button
                aria-label="Subscribe"
                className="gradient-primary text-white px-4 py-2.5 rounded-md text-sm font-semibold hover:scale-105 transition-transform duration-200"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar — 32px vertical gap acting as separator */}
        <div className="pt-6">
          <p className="font-inter text-label-sm tracking-[0.05em] uppercase text-on-surface/40">
            © 2024 DRIVESHARE MOBILITY. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
