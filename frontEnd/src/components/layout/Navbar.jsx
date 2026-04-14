import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Explore", to: "/" },
  { label: "How it Works", to: "/#how-it-works" },
  { label: "List Your Car", to: "/#list" },
];

function NavLink({ label, to, active }) {
  return (
    <Link
      to={to}
      className={[
        "font-body text-body-md font-medium no-underline transition-colors duration-200",
        active
          ? "text-primary"
          : "text-on-surface/65 hover:text-on-surface",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || isAuthPage
          ? "glass-surface shadow-ambient"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="max-w-screen-xl mx-auto px-8 lg:px-16 flex items-center justify-between h-16">
        <Link
          to="/"
          className="font-display font-bold text-xl no-underline text-on-surface"
        >
          Drive<span className="text-primary">Share</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              {...link}
              active={location.pathname === link.to}
            />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="font-body text-body-md font-medium no-underline text-on-surface/70 hover:text-on-surface transition-colors px-4 py-2"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="font-body text-body-md font-bold no-underline text-on-primary bg-primary-gradient px-5 py-2 rounded-md hover:shadow-ambient transition-all duration-200 hover:scale-[1.02]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
