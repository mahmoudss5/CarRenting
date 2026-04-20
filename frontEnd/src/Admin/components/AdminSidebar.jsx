import { Link, useLocation } from "react-router-dom";
import { LayoutGrid, Car, ClipboardList, Users, ShieldCheck, Plus } from "lucide-react";

const NAV_ITEMS = [
  { label: "Overview",         icon: LayoutGrid,    to: "/admin",               exact: true  },
  { label: "Car Posts",        icon: Car,            to: "/admin/cars",          exact: false },
  { label: "Rental Requests",  icon: ClipboardList,  to: "/admin/rentals",       exact: false },
  { label: "Users",            icon: Users,          to: "/admin/users",         exact: false },
  { label: "Verifications",    icon: ShieldCheck,    to: "/admin/verifications", exact: false },
];

const ACCENT_COLORS = {
  "/admin":                 { ring: "#003d9b", bg: "rgba(0,61,155,0.08)", text: "#003d9b" },
  "/admin/cars":            { ring: "#16a34a", bg: "rgba(22,163,74,0.08)", text: "#16a34a" },
  "/admin/rentals":         { ring: "#d97706", bg: "rgba(217,119,6,0.08)", text: "#d97706" },
  "/admin/users":           { ring: "#7c3aed", bg: "rgba(124,58,237,0.08)", text: "#7c3aed" },
  "/admin/verifications":   { ring: "#0891b2", bg: "rgba(8,145,178,0.08)", text: "#0891b2" },
};

function NavItem({ label, icon: Icon, to, active }) {
  const accent = ACCENT_COLORS[to] ?? ACCENT_COLORS["/admin"];

  return (
    <Link
      to={to}
      style={active ? { background: accent.bg, color: accent.text, boxShadow: `inset 3px 0 0 0 ${accent.ring}` } : {}}
      className={[
        "flex items-center gap-3 px-4 py-2.5 rounded-md",
        "font-body text-body-md transition-all duration-150 no-underline",
        active
          ? "font-semibold"
          : "text-on-surface/50 hover:bg-surface-low/60 hover:text-on-surface",
      ].join(" ")}
    >
      <Icon
        size={17}
        strokeWidth={1.8}
        style={active ? { color: accent.text } : {}}
        className={active ? "" : "text-on-surface/35"}
      />
      {label}
    </Link>
  );
}

export default function AdminSidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="w-60 min-h-screen bg-white border-r border-surface-dim flex flex-col justify-between py-8 px-3 shrink-0 shadow-[1px_0_0_0_rgba(99,102,120,0.08)]">
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
          {NAV_ITEMS.map((item) => {
            const active = item.exact
              ? pathname === item.to
              : pathname.startsWith(item.to);
            return <NavItem key={item.to} {...item} active={active} />;
          })}
        </nav>
      </div>

      <div className="px-3">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-md bg-primary-gradient text-on-primary font-body font-semibold text-body-md transition-all duration-200 hover:scale-[1.02] hover:shadow-ambient cursor-pointer border-0">
          <Plus size={15} strokeWidth={2.2} />
          Add New Listing
        </button>
      </div>
    </aside>
  );
}
