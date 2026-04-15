import { Link } from "react-router-dom";
import { Car, Bell, UserCircle, LogOut } from "lucide-react";

function NavIconBtn({ children, danger = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        "w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer border-0 bg-transparent",
        danger
          ? "text-red-400/60 hover:text-red-500 hover:bg-red-50"
          : "text-on-surface/40 hover:text-primary hover:bg-surface-low",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

const NAV_LINKS = [
  { label: "Owner Dashboard", to: "/owner/home", active: false },
  { label: "Admin Portal", to: "/admin", active: true },
];

export default function AdminNavbar() {
  return (
    <header className="sticky top-0 z-40 bg-surface-bright border-b border-surface-dim shadow-ambient">
      <div className="flex justify-between items-center px-8 lg:px-12 py-4">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
            <Car size={14} className="text-white" strokeWidth={2} />
          </div>
          <span className="font-display font-bold text-[1.25rem] tracking-tight text-on-surface">
            Drive<span className="text-primary">Share</span>
          </span>
        </Link>

        <nav className="flex items-center gap-5">
          {NAV_LINKS.map(({ label, to, active }) => (
            <Link
              key={to}
              to={to}
              className={[
                "font-body text-body-md no-underline transition-colors",
                active
                  ? "text-primary font-semibold border-b-2 border-primary pb-0.5"
                  : "text-on-surface/50 hover:text-on-surface",
              ].join(" ")}
            >
              {label}
            </Link>
          ))}
          <div className="flex items-center gap-1 ml-2">
            <NavIconBtn><Bell size={19} strokeWidth={1.8} /></NavIconBtn>
            <NavIconBtn><UserCircle size={19} strokeWidth={1.8} /></NavIconBtn>
            <NavIconBtn danger><LogOut size={19} strokeWidth={1.8} /></NavIconBtn>
          </div>
        </nav>
      </div>
    </header>
  );
}
