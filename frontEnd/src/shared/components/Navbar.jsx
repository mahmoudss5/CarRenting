import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  Menu,
  X,
  LogIn,
  UserCircle,
  LayoutDashboard,
  Compass,
  Settings,
  ShieldCheck,
  LogOut,
  Sparkles,
  Plus,
} from "lucide-react";
import PrimaryButton from "./PrimaryButton";
import NotificationBell from "../../components/ui/NotificationBell";
import { getUser, clearAuth } from "../../lib/auth";
import { webSocketService } from "../../services/WebSocketService";

const RENTER_LINKS = [
  { to: "/renter-home", label: "Home", icon: Car, end: true },
  { to: "/renter-explore", label: "Discover", icon: Compass },
  { to: "/renter-dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/renter-settings", label: "Settings", icon: Settings },
];

const OWNER_LINKS = [
  { to: "/owner/home", label: "Home", icon: Car, end: false },
  { to: "/owner", label: "Dashboard", icon: LayoutDashboard },
  { to: "/owner/create-post", label: "Create Post", icon: Plus },
  { to: "/owner/settings", label: "Settings", icon: Settings },
];

const GUEST_LINKS = [
  { to: "/renter-explore", label: "Explore Cars" },
  { to: "/#how-it-works", label: "How it Works" },
  { to: "/signup", label: "List Your Car" },
];

function normalizeRole(user) {
  if (!user) return "guest";
  const r = String(user.role ?? "")
    .toLowerCase()
    .replace(/[\s_-]/g, "");
  if (r === "admin") return "admin";
  if (r === "carowner" || r === "owner") return "owner";
  return "renter";
}

function roleLabel(role) {
  if (role === "guest") return null;
  if (role === "owner") return "Owner";
  if (role === "admin") return "Admin";
  return "Renter";
}

function logoTarget(role) {
  if (role === "owner") return "/owner/home";
  if (role === "admin") return "/admin";
  if (role === "renter") return "/renter-home";
  return "/";
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = getUser();
  const role = normalizeRole(user);

  const isGuest = role === "guest";
  const isAdminRoute = pathname.startsWith("/admin");
  const isMarketingLanding = pathname === "/" && isGuest;

  const showAdminPortalLink = user && role === "admin" && !isAdminRoute;

  const navLinks = (() => {
    if (isGuest) return [];
    if (role === "owner") return OWNER_LINKS;
    const links = [...RENTER_LINKS];
    if (showAdminPortalLink) {
      links.push({ to: "/admin", label: "Admin Portal", icon: ShieldCheck, end: false });
    }
    return links;
  })();

  useEffect(() => {
    if (!isMarketingLanding) return;
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMarketingLanding]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  function handleLogout() {
    clearAuth();
    webSocketService.disconnect();
    navigate("/login");
  }

  const badge = roleLabel(role);
  const homeLink = logoTarget(role);

  // Admin area: compact sticky bar (sidebar holds primary nav)
  if (isAdminRoute && user && role === "admin") {
    return (
      <header className="sticky top-0 z-40 bg-surface-bright border-b border-surface-dim shadow-ambient">
        <div className="flex justify-between items-center px-6 sm:px-8 lg:px-12 py-4">
          <Link to="/admin" className="flex items-center gap-2 no-underline flex-wrap min-w-0">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center shrink-0">
              <Car size={14} className="text-white" strokeWidth={2} />
            </div>
            <span className="font-display font-bold text-[1.15rem] sm:text-[1.25rem] tracking-tight text-on-surface">
              Drive<span className="text-primary">Share</span>
            </span>
            <span className="text-[0.65rem] sm:text-xs font-body font-semibold text-primary/90 bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wide">
              {badge}
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {user?.full_name && (
              <span className="hidden sm:inline font-body text-body-md font-medium text-on-surface/80 truncate max-w-[140px]">
                {user.full_name}
              </span>
            )}
            <NotificationBell />
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 font-body text-[0.85rem] font-semibold text-on-surface/70 hover:text-red-500 transition-colors px-2 sm:px-3 py-2 rounded-md hover:bg-surface-low border-0 bg-transparent cursor-pointer"
            >
              <LogOut size={17} strokeWidth={1.8} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>
    );
  }

  // Car owners: fixed glass bar + owner links (any route; matches PageLayout top padding)
  if (user && role === "owner") {
    return (
      <>
        <header className="fixed top-0 left-0 right-0 z-30 glass-surface border-b border-surface-dim shadow-ambient">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-6 sm:px-8 py-4 lg:px-16">
            <Link to="/owner/home" className="flex items-center gap-2 no-underline min-w-0 shrink">
              <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center shrink-0">
                <Car size={14} className="text-white" strokeWidth={2} />
              </div>
              <span className="font-display font-bold text-[1.05rem] sm:text-[1.15rem] text-on-surface truncate">
                Drive<span className="text-primary">Share</span>
              </span>
              <span className="text-[0.65rem] sm:text-xs font-body font-semibold text-primary/90 bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wide shrink-0">
                {badge}
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-4 xl:gap-5 font-body text-body-md text-on-surface/70">
              {OWNER_LINKS.map(({ to, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-semibold no-underline border-b-2 border-primary pb-0.5"
                      : "text-on-surface/60 no-underline hover:text-on-surface transition-colors"
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {user?.full_name && (
                <div className="hidden md:flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-md bg-surface-low max-w-[160px]">
                  <UserCircle size={15} className="text-primary shrink-0" strokeWidth={1.8} />
                  <span className="font-body text-[0.8rem] sm:text-[0.88rem] font-medium text-on-surface/80 truncate">
                    {user.full_name}
                  </span>
                </div>
              )}
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="hidden sm:block">
                <Link to="/owner/create-post" className="no-underline">
                  <PrimaryButton fullWidth={false} className="flex items-center gap-1.5 px-4 sm:px-5 py-2 text-body-md">
                    <Plus size={15} strokeWidth={2.2} />
                    Create Post
                  </PrimaryButton>
                </Link>
              </motion.div>
              <NotificationBell />
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center justify-center w-9 h-9 rounded-full text-on-surface/40 hover:text-red-500 hover:bg-red-50 transition-colors border-0 bg-transparent cursor-pointer"
                aria-label="Logout"
              >
                <LogOut size={17} strokeWidth={1.8} />
              </button>
              <button
                type="button"
                className="lg:hidden p-2 rounded-md text-on-surface/70 hover:bg-surface-low border-0 bg-transparent cursor-pointer"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </header>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="lg:hidden fixed inset-x-0 top-[65px] z-20 glass-surface border-b border-surface-dim shadow-ambient"
            >
              <nav className="flex flex-col px-6 py-3">
                {user && (
                  <div className="flex items-center gap-2 py-3 border-b border-surface-dim text-on-surface/80 font-body text-body-md font-semibold">
                    <UserCircle size={16} className="text-primary" />
                    <span className="truncate">{user.full_name}</span>
                    <span className="ml-auto text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      {badge}
                    </span>
                  </div>
                )}
                {OWNER_LINKS.map(({ to, label, icon: Icon, end }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 font-body text-body-md font-medium no-underline py-3 border-b border-surface-dim ${
                        isActive ? "text-primary" : "text-on-surface/70"
                      }`
                    }
                  >
                    <Icon size={16} strokeWidth={1.8} />
                    {label}
                  </NavLink>
                ))}
                <Link
                  to="/owner/create-post"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 mb-1 flex items-center justify-center gap-2 py-2.5 rounded-md font-body font-semibold text-white bg-primary-gradient no-underline"
                >
                  <Plus size={16} />
                  Create Post
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-2 py-3 text-red-500 font-body font-medium border-0 bg-transparent cursor-pointer text-left"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Guest marketing (landing) + optional scroll transparency
  if (isGuest && isMarketingLanding) {
    return (
      <>
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={[
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
            scrolled ? "glass-surface shadow-ambient border-b border-surface-dim" : "bg-transparent",
          ].join(" ")}
        >
          <div className="max-w-screen-xl mx-auto px-6 lg:px-16 flex items-center justify-between h-16">
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
            <nav className="hidden md:flex items-center gap-8">
              {GUEST_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="font-body text-body-md font-medium no-underline text-on-surface/65 hover:text-on-surface transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 h-0.5 bg-primary rounded-full w-0 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>
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
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-on-surface/70 hover:bg-surface-low transition-colors border-0 bg-transparent cursor-pointer"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </motion.header>
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
                {GUEST_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="font-body text-body-md font-medium no-underline text-on-surface/70 hover:text-on-surface py-3 border-b border-surface-dim last:border-0"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-2 pt-3">
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 font-body text-body-md font-medium no-underline text-on-surface py-2.5 rounded-md border border-surface-dim hover:bg-surface-low"
                  >
                    <LogIn size={16} />
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileOpen(false)}
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

  // Default: renter app shell (fixed glass) — also used for guest on non-landing pages if any
  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-8 lg:px-10 py-4 glass-surface border-b border-surface-dim"
        style={{ boxShadow: "0 1px 0 rgba(20, 27, 44, 0.06)" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <Link to={homeLink} className="flex items-center gap-2 no-underline min-w-0 shrink">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0"
            >
              <Car size={16} className="text-white" strokeWidth={2} />
            </motion.div>
            <span className="font-display font-extrabold text-[1.15rem] sm:text-[1.35rem] text-on-surface tracking-tight truncate">
              Drive<span className="text-primary">Share</span>
            </span>
            {!isGuest && badge && (
              <span className="text-[0.65rem] sm:text-xs font-body font-semibold text-primary/90 bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wide shrink-0">
                {badge}
              </span>
            )}
          </Link>

          {!isGuest && (
            <nav className="hidden md:flex items-center gap-5 lg:gap-6">
              {navLinks.map(({ to, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `font-body text-[0.9rem] font-medium no-underline transition-colors duration-200 relative group ${
                      isActive ? "text-primary" : "text-on-surface/60 hover:text-on-surface"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      <span
                        className={`absolute -bottom-0.5 left-0 h-0.5 bg-primary rounded-full transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          )}

          {isGuest ? (
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/login"
                className="flex items-center gap-1.5 font-body text-[0.9rem] font-semibold text-on-surface/70 hover:text-primary transition-colors no-underline px-3 py-2 rounded-md hover:bg-surface-low"
              >
                <LogIn size={15} />
                Login
              </Link>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <PrimaryButton to="/signup" size="sm">
                  Sign Up
                </PrimaryButton>
              </motion.div>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2 lg:gap-3 shrink-0">
              <div className="flex items-center gap-2 px-2 lg:px-3 py-1.5 rounded-md bg-surface-low max-w-[180px]">
                <UserCircle size={16} className="text-primary shrink-0" strokeWidth={1.8} />
                <span className="font-body text-[0.85rem] lg:text-[0.9rem] font-medium text-on-surface/80 truncate">
                  {user.full_name}
                </span>
              </div>
              <NotificationBell />
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1.5 font-body text-[0.9rem] font-semibold text-on-surface/70 hover:text-red-500 transition-colors px-2 lg:px-3 py-2 rounded-md hover:bg-surface-low border-0 bg-transparent cursor-pointer"
              >
                <LogOut size={15} />
                Logout
              </button>
            </div>
          )}

          <button
            type="button"
            className="md:hidden p-2 rounded-md text-on-surface/70 hover:bg-surface-low transition-colors border-0 bg-transparent cursor-pointer shrink-0"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[65px] left-0 right-0 z-40 glass-surface border-b border-surface-dim shadow-ambient md:hidden"
          >
            <nav className="flex flex-col px-6 py-3 gap-0.5 max-h-[70vh] overflow-y-auto">
              {!isGuest && user && (
                <div className="flex items-center gap-2.5 py-3 border-b border-surface-dim text-on-surface/80 font-body text-body-md font-semibold">
                  <UserCircle size={16} strokeWidth={1.8} className="text-primary shrink-0" />
                  <span className="truncate">{user.full_name}</span>
                  {badge && (
                    <span className="ml-auto text-[0.65rem] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full shrink-0">
                      {badge}
                    </span>
                  )}
                </div>
              )}
              {!isGuest &&
                navLinks.map(({ to, label, icon: Icon, end }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 font-body text-body-md font-medium no-underline py-3 border-b border-surface-dim last:border-0 transition-colors ${
                        isActive ? "text-primary" : "text-on-surface/70 hover:text-on-surface"
                      }`
                    }
                  >
                    <Icon size={16} strokeWidth={1.8} />
                    {label}
                  </NavLink>
                ))}
              {isGuest && (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 font-body text-body-md font-medium py-3 text-on-surface/70 no-underline border-b border-surface-dim"
                  >
                    <LogIn size={16} />
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 font-body text-body-md font-semibold py-3 text-primary no-underline"
                  >
                    Sign Up
                  </Link>
                </>
              )}
              {!isGuest && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-2.5 font-body text-body-md font-medium py-3 text-red-500 border-0 bg-transparent cursor-pointer text-left"
                >
                  <LogOut size={16} strokeWidth={1.8} />
                  Logout
                </button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
