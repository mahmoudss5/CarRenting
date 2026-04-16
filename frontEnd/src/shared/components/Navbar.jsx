import { useState } from "react";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Menu, X, LogIn, UserCircle, LayoutDashboard, Compass, Settings, ShieldCheck, LogOut } from 'lucide-react';
import PrimaryButton from './PrimaryButton';
import { getUser, clearAuth } from '../../lib/auth';

const BASE_LINKS = [
  { to: "/renter-home", label: "Home", icon: Car, end: true },
  { to: "/renter-explore", label: "Discover", icon: Compass },
  { to: "/renter-dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/renter-settings", label: "Settings", icon: Settings },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const user = getUser();

  const isAdmin = user?.role?.toLowerCase() === "admin";
  const NAV_LINKS = isAdmin
    ? [...BASE_LINKS, { to: "/admin", label: "Admin Portal", icon: ShieldCheck }]
    : BASE_LINKS;

  function handleLogout() {
    clearAuth();
    navigate("/login");
  }

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-8 lg:px-10 py-4 glass-surface border-b border-surface-dim"
        style={{ boxShadow: '0 1px 0 rgba(20, 27, 44, 0.06)' }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/renter-home" className="flex items-center gap-2 no-underline">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center"
            >
              <Car size={16} className="text-white" strokeWidth={2} />
            </motion.div>
            <span className="font-display font-extrabold text-[1.35rem] text-on-surface tracking-tight">
              Drive<span className="text-primary">Share</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `font-body text-[0.9rem] font-medium no-underline transition-colors duration-200 relative group ${
                    isActive ? 'text-primary' : 'text-on-surface/60 hover:text-on-surface'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    <span className={`absolute -bottom-0.5 left-0 h-0.5 bg-primary rounded-full transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface-low">
                  <UserCircle size={16} className="text-primary" strokeWidth={1.8} />
                  <span className="font-body text-[0.9rem] font-medium text-on-surface/80">
                    {user.full_name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 font-body text-[0.9rem] font-semibold text-on-surface/70 hover:text-red-500 transition-colors px-3 py-2 rounded-md hover:bg-surface-low border-0 bg-transparent cursor-pointer"
                >
                  <LogOut size={15} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 font-body text-[0.9rem] font-semibold text-on-surface/70 hover:text-primary transition-colors no-underline px-3 py-2 rounded-md hover:bg-surface-low"
                >
                  <LogIn size={15} />
                  Login
                </Link>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <PrimaryButton to="/signup" size="sm">Sign Up</PrimaryButton>
                </motion.div>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-md text-on-surface/70 hover:bg-surface-low transition-colors"
            onClick={() => setMobileOpen(v => !v)}
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
            <nav className="flex flex-col px-6 py-3 gap-0.5">
              {user && (
                <div className="flex items-center gap-2.5 py-3 border-b border-surface-dim text-on-surface/80 font-body text-body-md font-semibold">
                  <UserCircle size={16} strokeWidth={1.8} className="text-primary" />
                  {user.full_name}
                </div>
              )}
              {NAV_LINKS.map(({ to, label, icon: Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 font-body text-body-md font-medium no-underline py-3 border-b border-surface-dim last:border-0 transition-colors ${
                      isActive ? 'text-primary' : 'text-on-surface/70 hover:text-on-surface'
                    }`
                  }
                >
                  <Icon size={16} strokeWidth={1.8} />
                  {label}
                </NavLink>
              ))}
              {user ? (
                <button
                  onClick={() => { setMobileOpen(false); handleLogout(); }}
                  className="flex items-center gap-2.5 font-body text-body-md font-medium py-3 text-red-500 border-0 bg-transparent cursor-pointer text-left"
                >
                  <LogOut size={16} strokeWidth={1.8} />
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 font-body text-body-md font-medium no-underline py-3 text-on-surface/70 hover:text-on-surface transition-colors"
                >
                  <LogIn size={16} strokeWidth={1.8} />
                  Login
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
