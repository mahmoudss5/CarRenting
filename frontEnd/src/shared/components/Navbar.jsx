import { Link, NavLink } from 'react-router-dom';
import PrimaryButton from './PrimaryButton';
import { GLASS_BACKGROUND, GLASS_BLUR } from '../../design/tokens';

/**
 * Global glassmorphism navbar — floats over hero imagery.
 * Fixed position, full-width, z-50.
 */
export default function Navbar() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 px-10 py-4"
      style={{
        background: GLASS_BACKGROUND,
        backdropFilter: GLASS_BLUR,
        WebkitBackdropFilter: GLASS_BLUR,
        boxShadow: '0 1px 0 rgba(20, 27, 44, 0.06)',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-manrope font-extrabold text-[1.5rem] text-on-surface tracking-tight"
        >
          Drive<span className="text-primary">Share</span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `font-inter text-[0.9rem] font-medium transition-colors duration-200 ${
                isActive ? 'text-primary' : 'text-on-surface/60 hover:text-on-surface'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/explore"
            className={({ isActive }) =>
              `font-inter text-[0.9rem] font-medium transition-colors duration-200 ${
                isActive ? 'text-primary' : 'text-on-surface/60 hover:text-on-surface'
              }`
            }
          >
            Discover
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `font-inter text-[0.9rem] font-medium transition-colors duration-200 ${
                isActive ? 'text-primary' : 'text-on-surface/60 hover:text-on-surface'
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `font-inter text-[0.9rem] font-medium transition-colors duration-200 ${
                isActive ? 'text-primary' : 'text-on-surface/60 hover:text-on-surface'
              }`
            }
          >
            Settings
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `font-inter text-[0.9rem] font-medium transition-colors duration-200 ${
                isActive ? 'text-primary' : 'text-on-surface/60 hover:text-on-surface'
              }`
            }
          >
            Admin Portal
          </NavLink>
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="font-inter text-[0.9rem] font-semibold text-on-surface/70 hover:text-primary transition-colors duration-200"
          >
            Login
          </Link>
          <PrimaryButton to="/signup" size="sm">
            Sign Up
          </PrimaryButton>
        </div>
      </div>
    </header>
  );
}
