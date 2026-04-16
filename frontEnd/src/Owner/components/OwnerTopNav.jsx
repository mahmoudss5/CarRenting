import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Car, Plus, UserCircle, LogOut } from "lucide-react";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { getUser, clearAuth } from "../../lib/auth";

const OWNER_LINKS = [
  { label: "Home", to: "/owner/home" },
  { label: "Dashboard", to: "/owner" },
  { label: "Create Post", to: "/owner/create-post" },
  { label: "Settings", to: "/owner/settings" },
];

export default function OwnerTopNav() {
  const navigate = useNavigate();
  const user = getUser();

  function handleLogout() {
    clearAuth();
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-30 glass-surface border-b border-surface-dim shadow-ambient">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-4 lg:px-16">
        <Link to="/owner/home" className="flex items-center gap-2 no-underline">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
            <Car size={14} className="text-white" strokeWidth={2} />
          </div>
          <span className="font-display font-bold text-[1.15rem] text-on-surface">
            Drive<span className="text-primary">Share</span>
          </span>
          <span className="ml-1 text-xs font-body font-semibold text-primary/70 bg-primary/10 px-2 py-0.5 rounded-full">
            Owner
          </span>
        </Link>

        <nav className="flex items-center gap-5 font-body text-body-md text-on-surface/70">
          {OWNER_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold no-underline border-b-2 border-primary pb-0.5"
                  : "text-on-surface/60 no-underline hover:text-on-surface transition-colors"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user?.full_name && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface-low">
              <UserCircle size={15} className="text-primary" strokeWidth={1.8} />
              <span className="font-body text-[0.88rem] font-medium text-on-surface/80">
                {user.full_name}
              </span>
            </div>
          )}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link to="/owner/create-post" className="no-underline">
              <PrimaryButton fullWidth={false} className="flex items-center gap-1.5 px-5 py-2 text-body-md">
                <Plus size={15} strokeWidth={2.2} />
                Create Post
              </PrimaryButton>
            </Link>
          </motion.div>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-9 h-9 rounded-full text-on-surface/40 hover:text-red-500 hover:bg-red-50 transition-colors border-0 bg-transparent cursor-pointer"
          >
            <LogOut size={17} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </header>
  );
}
