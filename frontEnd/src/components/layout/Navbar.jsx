import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Menu, X, LogIn, Sparkles } from "lucide-react";

const NAV_LINKS = [
  { label: "Explore Cars", to: "/renter-explore" },
  { label: "How it Works", to: "/#how-it-works" },
  { label: "List Your Car", to: "/signup" },
];

function NavLink({ label, to, active }) {
  return (
    <Link
      to={to}
      className={[
        "font-body text-body-md font-medium no-underline transition-colors duration-200 relative group",
        active ? "text-primary" : "text-on-surface/65 hover:text-on-surface",
      ].join(" ")}
    >
      {label}
      <span
        className={[
          "absolute -bottom-0.5 left-0 h-0.5 bg-primary rounded-full transition-all duration-300",
          active ? "w-full" : "w-0 group-hover:w-full",
        ].join(" ")}
      />
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled || isAuthPage
            ? "glass-surface shadow-ambient border-b border-surface-dim"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="max-w-screen-xl mx-auto px-6 lg:px-16 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline group">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center"
            >
              <Car size={18} className="text-white" strokeWidth={2} />
            </motion.div>
            <span className="font-display font-bold text-xl text-on-surface">
              Drive<span className="text-primary">Share</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                {...link}
                active={location.pathname === link.to}
              />
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="flex items-center gap-2 font-body text-body-md font-medium no-underline text-on-surface/70 hover:text-on-surface transition-colors px-4 py-2 rounded-md hover:bg-surface-low"
            >
              <LogIn size={16} />
              Sign In
            </Link>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/signup"
                className="flex items-center gap-2 font-body text-body-md font-bold no-underline text-on-primary bg-primary-gradient px-5 py-2 rounded-md hover:shadow-ambient transition-all duration-200"
              >
                <Sparkles size={15} />
                Get Started
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-md text-on-surface/70 hover:bg-surface-low transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 glass-surface border-b border-surface-dim shadow-ambient md:hidden"
          >
            <nav className="flex flex-col px-6 py-4 gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="font-body text-body-md font-medium no-underline text-on-surface/70 hover:text-on-surface py-3 border-b border-surface-dim last:border-0 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-3">
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 font-body text-body-md font-medium no-underline text-on-surface py-2.5 rounded-md border border-surface-dim hover:bg-surface-low transition-colors"
                >
                  <LogIn size={16} />
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center justify-center gap-2 font-body text-body-md font-bold no-underline text-on-primary bg-primary-gradient py-2.5 rounded-md"
                >
                  <Sparkles size={15} />
                  Get Started
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
