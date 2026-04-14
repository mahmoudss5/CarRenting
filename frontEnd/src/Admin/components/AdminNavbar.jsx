import { Link } from "react-router-dom";

function BellIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function UserCircleIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function NavIconBtn({ children, danger = false }) {
  return (
    <button
      className={[
        "w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer border-0 bg-transparent",
        danger
          ? "text-[#e53935]/50 hover:text-[#e53935] hover:bg-[rgba(229,57,53,0.06)]"
          : "text-on-surface/40 hover:text-primary hover:bg-surface-low",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

const NAV_LINKS = [
  { label: "Owner Dashboard", to: "/owner", active: false },
  { label: "Admin Portal", to: "/admin", active: true },
];

export default function AdminNavbar() {
  return (
    <header className="sticky top-0 z-40 bg-surface-bright shadow-ambient">
      <div className="flex justify-between items-center px-10 py-4">
        <Link
          to="/"
          className="font-display font-bold text-[1.375rem] tracking-tight text-on-surface no-underline"
        >
          DriveShare
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
          <NavIconBtn><BellIcon /></NavIconBtn>
          <NavIconBtn><UserCircleIcon /></NavIconBtn>
          <NavIconBtn danger><LogoutIcon /></NavIconBtn>
        </nav>
      </div>
    </header>
  );
}
