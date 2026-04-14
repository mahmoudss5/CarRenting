import { Link } from "react-router-dom";

export default function AdminNavbar() {
  return (
    <header className="w-full box-border bg-white border-b border-gray-200 shadow-sm">
      <div className="flex justify-between items-center px-10 py-4">

        {/* Logo */}
        <Link to="/" className="font-extrabold text-[1.4rem] no-underline text-black">
          Car<span className="text-indigo-500">Share</span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          <Link
            to="/owner"
            className="text-gray-500 no-underline text-[0.95rem] font-medium hover:text-indigo-500 transition-colors"
          >
            Owner Dashboard
          </Link>
          <span className="text-indigo-500 font-bold text-[0.95rem] border-b-2 border-indigo-500 pb-0.5">
            Admin Portal
          </span>
          <span className="text-[1.3rem] cursor-pointer">🔔</span>
          <span className="text-[1.3rem] cursor-pointer">👤</span>
          <span className="text-[1.3rem] cursor-pointer text-red-500">⎋</span>
        </div>

      </div>
    </header>
  );
}