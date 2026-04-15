import { Link } from 'react-router-dom';
import { Car, MessageCircle, Camera, Globe, ArrowRight } from 'lucide-react';

const platformLinks = [
  { label: 'Explore Fleet', to: '/renter-explore' },
  { label: 'How it Works', to: '/#how-it-works' },
  { label: 'Pricing', to: '/' },
];
const legalLinks = [
  { label: 'Privacy Policy', to: '/' },
  { label: 'Terms of Service', to: '/' },
  { label: 'Cookie Policy', to: '/' },
];

export default function Footer() {
  return (
    <footer className="bg-surface-dim border-t border-surface-dim px-8 lg:px-16 pt-12 pb-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link to="/renter-home" className="flex items-center gap-2 no-underline mb-3">
              <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                <Car size={14} className="text-white" strokeWidth={2} />
              </div>
              <span className="font-display font-extrabold text-[1.1rem] text-on-surface">
                Drive<span className="text-primary">Share</span>
              </span>
            </Link>
            <p className="font-body text-body-md text-on-surface/55 leading-relaxed max-w-[200px]">
              Premium car sharing for the modern explorer.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {[MessageCircle, Camera, Globe].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-full bg-surface-high flex items-center justify-center text-on-surface/50 hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-body text-label-sm font-bold tracking-[0.05em] uppercase text-on-surface/50 mb-4">
              Platform
            </h4>
            <ul className="flex flex-col gap-2.5">
              {platformLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="font-body text-body-md text-on-surface/60 hover:text-primary transition-colors duration-200 no-underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-body text-label-sm font-bold tracking-[0.05em] uppercase text-on-surface/50 mb-4">
              Legal
            </h4>
            <ul className="flex flex-col gap-2.5">
              {legalLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="font-body text-body-md text-on-surface/60 hover:text-primary transition-colors duration-200 no-underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-body text-label-sm font-bold tracking-[0.05em] uppercase text-on-surface/50 mb-4">
              Newsletter
            </h4>
            <p className="font-body text-body-md text-on-surface/55 mb-4">
              Stay ahead of the fleet.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                aria-label="Newsletter email"
                className="flex-1 px-4 py-2.5 rounded-md text-sm font-body text-on-surface bg-surface-lowest border border-surface-dim outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              />
              <button
                aria-label="Subscribe"
                className="bg-primary text-white px-4 py-2.5 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors duration-200 flex items-center"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-surface-dim">
          <p className="font-body text-label-sm tracking-[0.05em] uppercase text-on-surface/40">
            © {new Date().getFullYear()} DriveShare Mobility. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
