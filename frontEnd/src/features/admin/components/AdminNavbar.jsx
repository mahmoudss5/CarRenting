import { Link, NavLink } from 'react-router-dom';
import { GLASS_BACKGROUND, GLASS_BLUR } from '../../../design/tokens';

/**
 * Admin-specific navbar — same glassmorphism as the shared Navbar
 * but highlights the Admin Portal link and shows admin-specific actions.
 */
export default function AdminNavbar() {
  return (
    <header
      className="w-full px-10 py-4"
      style={{
        background: GLASS_BACKGROUND,
        backdropFilter: GLASS_BLUR,
        WebkitBackdropFilter: GLASS_BLUR,
        boxShadow: '0 1px 0 rgba(20, 27, 44, 0.06)',
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-manrope font-extrabold text-[1.4rem] text-on-surface tracking-tight"
        >
          Drive<span className="text-primary">Share</span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-8">
          <NavLink
            to="/"
            end
            className="font-inter text-[0.9rem] font-medium text-on-surface/55 hover:text-on-surface transition-colors duration-200"
          >
            Owner Dashboard
          </NavLink>
          <span className="font-inter text-[0.9rem] font-bold text-primary border-b-2 border-primary pb-0.5">
            Admin Portal
          </span>
        </nav>

        {/* Admin actions */}
        <div className="flex items-center gap-5 text-on-surface/60">
          <button aria-label="Notifications" className="text-[1.2rem] hover:text-primary transition-colors duration-200 cursor-pointer">
            🔔
          </button>
          <button aria-label="Profile" className="text-[1.2rem] hover:text-primary transition-colors duration-200 cursor-pointer">
            👤
          </button>
          <Link
            to="/login"
            aria-label="Logout"
            className="text-[1.2rem] hover:text-red-500 transition-colors duration-200"
          >
            ⎋
          </Link>
        </div>
      </div>
    </header>
  );
}
