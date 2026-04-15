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

function FooterColumn({ heading, links }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-body text-label-sm uppercase tracking-[0.05em] text-on-surface/40">
        {heading}
      </p>
      {links.map((link) => (
        <Link
          key={link.label}
          to={link.to}
          className="font-body text-body-md text-on-surface/60 hover:text-on-surface no-underline transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export default function SiteFooter() {
  return (
    <footer className="bg-surface-dim pt-16 pb-8">
      <div className="max-w-screen-xl mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 no-underline group">
              <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                <Car size={14} className="text-white" strokeWidth={2} />
              </div>
              <span className="font-display font-bold text-xl text-on-surface">
                Drive<span className="text-primary">Share</span>
              </span>
            </Link>
            <p className="font-body text-body-md text-on-surface/55 mt-4 leading-relaxed max-w-[200px]">
              Premium mobility, curated for the discerning driver.
            </p>
            <div className="flex items-center gap-3 mt-5">
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
          <FooterColumn heading="Platform" links={PLATFORM_LINKS} />
          <FooterColumn heading="Support" links={SUPPORT_LINKS} />
          <FooterColumn heading="Legal" links={LEGAL_LINKS} />
        </div>

        <div className="pt-8" style={{ borderTop: "1px solid rgba(99, 102, 120, 0.15)" }}>
          <p className="font-body text-body-md text-on-surface/40 text-center">
            © {new Date().getFullYear()} DriveShare Mobility. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
