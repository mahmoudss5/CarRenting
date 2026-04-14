import { Link } from "react-router-dom";

const PLATFORM_LINKS = ["Explore Fleet", "How it Works", "List Your Car", "Pricing"];
const LEGAL_LINKS = ["Privacy Policy", "Terms of Service", "Cookie Policy"];
const SUPPORT_LINKS = ["Help Centre", "Contact Us", "Safety"];

function FooterColumn({ heading, links }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-body text-label-sm uppercase tracking-[0.05em] text-on-surface/40">
        {heading}
      </p>
      {links.map((link) => (
        <span
          key={link}
          className="font-body text-body-md text-on-surface/60 hover:text-on-surface cursor-pointer transition-colors"
        >
          {link}
        </span>
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
            <Link
              to="/"
              className="font-display font-bold text-xl no-underline text-on-surface"
            >
              Drive<span className="text-primary">Share</span>
            </Link>
            <p className="font-body text-body-md text-on-surface/55 mt-4 leading-relaxed max-w-[200px]">
              Premium mobility, curated for the discerning driver.
            </p>
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
