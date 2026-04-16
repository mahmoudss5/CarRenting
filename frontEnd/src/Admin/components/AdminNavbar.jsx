import { Link, useNavigate } from "react-router-dom";
import { Car, Bell, LogOut } from "lucide-react";
import { getUser, clearAuth } from "../../lib/auth";

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

export default function AdminNavbar() {
  const navigate = useNavigate();
  const user = getUser();

  function handleLogout() {
    clearAuth();
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-40 bg-surface-bright border-b border-surface-dim shadow-ambient">
      <div className="flex justify-between items-center px-8 lg:px-12 py-4">
        <Link to="/admin" className="flex items-center gap-2 no-underline">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
            <Car size={14} className="text-white" strokeWidth={2} />
          </div>
          <span className="font-display font-bold text-[1.25rem] tracking-tight text-on-surface">
            Drive<span className="text-primary">Share</span>
          </span>
          <span className="ml-1 text-xs font-body font-semibold text-primary/70 bg-primary/10 px-2 py-0.5 rounded-full">
            Admin
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {user?.full_name && (
            <span className="font-body text-body-md font-medium text-on-surface/80">
              {user.full_name}
            </span>
          )}
          <div className="flex items-center gap-1">
            <NavIconBtn><Bell size={19} strokeWidth={1.8} /></NavIconBtn>
            <NavIconBtn danger onClick={handleLogout}><LogOut size={19} strokeWidth={1.8} /></NavIconBtn>
          </div>
        </div>
      </div>
    </header>
  );
}
