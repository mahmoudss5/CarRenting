import { Link, NavLink } from "react-router-dom";
import PrimaryButton from "../../components/ui/PrimaryButton";

const OWNER_LINKS = [
  { label: "Owner Home", to: "/owner/home" },
  { label: "Owner Dashboard", to: "/owner" },
  { label: "Create Post", to: "/owner/create-post" },
  { label: "Profile Settings", to: "/owner/settings" },
];

export default function OwnerTopNav() {
  return (
    <header className="sticky top-0 z-30 glass-surface shadow-ambient">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-10 py-4 lg:px-20">
        <Link to="/owner/home" className="font-display text-title-md text-on-surface no-underline">
          DriveShare
        </Link>
        <nav className="flex items-center gap-6 font-body text-body-md text-on-surface/70">
          {OWNER_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? "text-primary no-underline" : "text-on-surface/75 no-underline hover:text-on-surface"
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/admin" className="no-underline hover:text-on-surface">
            Admin Portal
          </Link>
        </nav>
        <Link to="/owner/create-post" className="no-underline">
          <PrimaryButton fullWidth={false} className="px-5 py-2 text-body-md">
            Create Post
          </PrimaryButton>
        </Link>
      </div>
    </header>
  );
}
