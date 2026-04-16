import { Link } from 'react-router-dom';
import { Car, MessageCircle, Camera, Globe, ArrowRight, Mail } from 'lucide-react';

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

function FooterLink({ label, to }) {
  return (
    <li>
      <Link
        to={to}
        className="group flex items-center gap-1 font-inter text-[0.875rem] text-slate-400 hover:text-slate-800 no-underline transition-colors duration-200"
      >
        <span className="h-px w-0 bg-blue-500 transition-all duration-200 group-hover:w-3 group-hover:mr-1 rounded-full" />
        {label}
      </Link>
    </li>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white px-6 md:px-10 lg:px-16 pt-14 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/renter-home" className="flex items-center gap-2 no-underline mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-[0_2px_10px_rgba(0,61,155,0.30)]">
                <Car size={15} className="text-white" strokeWidth={2.2} />
              </div>
              <span className="font-display font-extrabold text-[1.1rem] text-slate-900">
                Drive<span className="text-blue-600">Share</span>
              </span>
            </Link>
            <p className="font-inter text-[0.875rem] text-slate-400 leading-relaxed max-w-[190px] mb-5">
              Premium car sharing for the modern explorer.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2">
              {[MessageCircle, Camera, Globe].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-400 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                >
                  <Icon size={13} strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>

          {/* Platform column */}
          <div>
            <h4 className="mb-4 font-inter text-[0.7rem] font-bold uppercase tracking-widest text-slate-500">
              Platform
            </h4>
            <ul className="flex flex-col gap-2.5">
              {platformLinks.map((l) => (
                <FooterLink key={l.label} {...l} />
              ))}
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <h4 className="mb-4 font-inter text-[0.7rem] font-bold uppercase tracking-widest text-slate-500">
              Legal
            </h4>
            <ul className="flex flex-col gap-2.5">
              {legalLinks.map((l) => (
                <FooterLink key={l.label} {...l} />
              ))}
            </ul>
          </div>

          {/* Newsletter column */}
          <div>
            <h4 className="mb-4 font-inter text-[0.7rem] font-bold uppercase tracking-widest text-slate-500">
              Newsletter
            </h4>
            <p className="font-inter text-[0.875rem] text-slate-400 mb-4 leading-relaxed">
              Stay ahead of the fleet.
            </p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail size={13} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" strokeWidth={1.8} />
                <input
                  type="email"
                  placeholder="you@email.com"
                  aria-label="Newsletter email"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-8 pr-3 font-inter text-[0.8125rem] text-slate-800 outline-none placeholder:text-slate-400 transition-all duration-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 focus:bg-white"
                />
              </div>
              <button
                aria-label="Subscribe"
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-[0_2px_10px_rgba(0,61,155,0.25)] hover:bg-blue-700 hover:shadow-[0_4px_16px_rgba(0,61,155,0.35)] transition-all duration-200"
              >
                <ArrowRight size={14} strokeWidth={2.2} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 pt-6">
          <p className="font-inter text-[0.78rem] text-slate-400">
            © {new Date().getFullYear()} DriveShare Mobility. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <p className="font-inter text-[0.78rem] text-slate-400">All systems operational</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
