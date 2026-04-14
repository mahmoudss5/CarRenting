import { Link, useLocation } from "react-router-dom";

function GridIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 11l1.5-4.5a2 2 0 0 1 1.9-1.5h7.2a2 2 0 0 1 1.9 1.5L19 11" />
      <rect x="3" y="11" width="18" height="7" rx="1.5" />
      <circle cx="7.5" cy="18" r="1.5" /><circle cx="16.5" cy="18" r="1.5" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

const NAV_ITEMS = [
  { label: "Overview", Icon: GridIcon, to: "/admin/overview" },
  { label: "My Cars", Icon: CarIcon, to: "/admin/cars" },
  { label: "Rental Requests", Icon: ClipboardIcon, to: "/admin/rentals" },
  { label: "Users", Icon: UsersIcon, to: "/admin/users" },
  { label: "Verifications", Icon: ShieldIcon, to: "/admin" },
];

function NavItem({ label, Icon, to, active }) {
  return (
    <Link
      to={to}
      className={[
        "flex items-center gap-3 px-4 py-2.5 rounded-md",
        "font-body text-body-md transition-all duration-150 no-underline",
        active
          ? "bg-surface-low text-primary font-semibold shadow-[inset_3px_0_0_0_#003d9b]"
          : "text-on-surface/50 hover:bg-surface-low/60 hover:text-on-surface",
      ].join(" ")}
    >
      <span className={active ? "text-primary" : "text-on-surface/35"}>
        <Icon />
      </span>
      {label}
    </Link>
  );
}

export default function AdminSidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="w-56 min-h-screen bg-surface flex flex-col justify-between py-8 px-3 shrink-0">
      <div>
        <div className="px-4 mb-6">
          <p className="font-display font-bold text-label-sm uppercase tracking-[0.05em] text-on-surface">
            Management
          </p>
          <p className="font-body text-label-sm text-on-surface/40 mt-0.5">
            Administrative Tools
          </p>
        </div>

        <nav className="flex flex-col gap-0.5">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.to} {...item} active={pathname === item.to} />
          ))}
        </nav>
      </div>

      <div className="px-3">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-md bg-primary-gradient text-on-primary font-body font-semibold text-body-md transition-all duration-200 hover:scale-[1.02] hover:shadow-ambient cursor-pointer border-0">
          <PlusIcon />
          Add New Listing
        </button>
      </div>
    </aside>
  );
}
