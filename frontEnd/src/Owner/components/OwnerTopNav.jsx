import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Car, Plus } from "lucide-react";
import PrimaryButton from "../../components/ui/PrimaryButton";

const OWNER_LINKS = [
  { label: "Home", to: "/owner/home" },
  { label: "Dashboard", to: "/owner" },
  { label: "Create Post", to: "/owner/create-post" },
  { label: "Settings", to: "/owner/settings" },
];

export default function OwnerTopNav() {
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
          <Link
            to="/admin"
            className="text-on-surface/50 no-underline hover:text-on-surface transition-colors text-sm"
          >
            Admin Portal
          </Link>
        </nav>

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Link to="/owner/create-post" className="no-underline">
            <PrimaryButton fullWidth={false} className="flex items-center gap-1.5 px-5 py-2 text-body-md">
              <Plus size={15} strokeWidth={2.2} />
              Create Post
            </PrimaryButton>
          </Link>
        </motion.div>
      </div>
    </header>
  );
}
