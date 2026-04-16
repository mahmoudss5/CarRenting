import { Link } from "react-router-dom";
import { Car, MessageCircle, Camera, Globe } from "lucide-react";

const PLATFORM_LINKS = [
  { label: "Explore Fleet", to: "/renter-explore" },
  { label: "How it Works", to: "/#how-it-works" },
  { label: "List Your Car", to: "/signup" },
  { label: "Pricing", to: "/" },
];
const LEGAL_LINKS = [
  { label: "Privacy Policy", to: "/" },
  { label: "Terms of Service", to: "/" },
  { label: "Cookie Policy", to: "/" },
];
const SUPPORT_LINKS = [
  { label: "Help Centre", to: "/" },
  { label: "Contact Us", to: "/" },
  { label: "Safety", to: "/" },
];

function FooterLink({ label, to }) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-1 font-inter text-[0.875rem] text-slate-400 hover:text-slate-800 no-underline transition-colors duration-200"
    >
      <span className="h-px w-0 bg-blue-500 transition-all duration-200 group-hover:w-3 group-hover:mr-1 rounded-full" />
      {label}
    </Link>
  );
}

function FooterColumn({ heading, links }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-inter text-[0.7rem] font-bold uppercase tracking-widest text-slate-500">
        {heading}
      </p>
      {links.map((link) => (
        <FooterLink key={link.label} label={link.label} to={link.to} />
      ))}
    </div>
  );
}

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/80 bg-white px-6 md:px-10 lg:px-16 pt-14 pb-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 no-underline mb-4 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-[0_2px_10px_rgba(0,61,155,0.30)] transition-shadow duration-200 group-hover:shadow-[0_4px_18px_rgba(0,61,155,0.40)]">
                <Car size={15} className="text-white" strokeWidth={2.2} />
              </div>
              <span className="font-display font-extrabold text-[1.1rem] text-slate-900">
                Drive<span className="text-blue-600">Share</span>
              </span>
            </Link>
            <p className="font-inter text-[0.875rem] text-slate-400 leading-relaxed max-w-[190px] mb-5">
              Premium mobility, curated for the discerning driver.
            </p>
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

          <FooterColumn heading="Platform" links={PLATFORM_LINKS} />
          <FooterColumn heading="Support" links={SUPPORT_LINKS} />
          <FooterColumn heading="Legal" links={LEGAL_LINKS} />
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
