import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ClipboardList, Search, DollarSign, Calendar } from "lucide-react";
import AdminLayout from "../AdminLayout";
import AvatarInitials from "../../components/ui/AvatarInitials";
import { getAllRentals } from "../../services/adminService";

function mapRental(r) {
  const status = (r.status ?? "").toLowerCase();
  return {
    id: String(r.request_id),
    carModel: r.car_title ?? "—",
    renter: r.renter_name ?? "—",
    renterInitials: (r.renter_name ?? "??").slice(0, 2).toUpperCase(),
    owner: r.owner_name ?? "—",
    startDate: r.start_date ?? "—",
    endDate: r.end_date ?? "—",
    total: `$${Number(r.total_price ?? 0).toFixed(0)}`,
    status: status === "accepted" ? "upcoming" : status,
  };
}

const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } };

const STATUS_STYLES = {
  upcoming:  { label: "Upcoming",  bg: "#dbeafe", color: "#1d4ed8", dot: "#3b82f6"  },
  active:    { label: "Active",    bg: "#dcfce7", color: "#166534", dot: "#16a34a"  },
  completed: { label: "Completed", bg: "#f3f4f6", color: "#374151", dot: "#9ca3af"  },
  cancelled: { label: "Cancelled", bg: "#ffe4e6", color: "#9f1239", dot: "#e11d48"  },
};

const TABS = ["all", "upcoming", "active", "completed", "cancelled"];


function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] ?? STATUS_STYLES.upcoming;
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
      style={{ background: s.bg, color: s.color }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
      {s.label}
    </span>
  );
}

export default function AdminRentalsPage() {
  const [rentals, setRentals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getAllRentals()
      .then((data) => setRentals(Array.isArray(data) ? data.map(mapRental) : []))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const SUMMARY_CARDS = [
    { label: "Total Rentals", value: String(rentals.length),                                                                gradient: "linear-gradient(135deg,#d97706,#f59e0b)", icon: ClipboardList },
    { label: "Active Now",    value: String(rentals.filter((r) => r.status === "active").length),                           gradient: "linear-gradient(135deg,#059669,#34d399)", icon: Calendar       },
    { label: "Total Revenue", value: `$${rentals.reduce((s, r) => s + Number((r.total ?? "$0").replace("$", "")), 0).toFixed(0)}`, gradient: "linear-gradient(135deg,#7c3aed,#a78bfa)", icon: DollarSign },
    { label: "Upcoming",      value: String(rentals.filter((r) => r.status === "upcoming").length),                         gradient: "linear-gradient(135deg,#1d4ed8,#3b82f6)", icon: Calendar       },
  ];

  const filtered = rentals.filter((r) => {
    const matchTab = activeTab === "all" || r.status === activeTab;
    const matchSearch =
      r.carModel.toLowerCase().includes(search.toLowerCase()) ||
      r.renter.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const counts = TABS.reduce((acc, t) => {
    acc[t] = t === "all" ? rentals.length : rentals.filter((r) => r.status === t).length;
    return acc;
  }, {});

  return (
    <AdminLayout>
      <motion.div variants={stagger} initial="hidden" animate="show">

        {/* Header */}
        <motion.div variants={fadeUp}
          className="rounded-2xl p-7 mb-8 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)" }}>
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10"
            style={{ background: "white", transform: "translate(30%,-30%)" }} />
          <div className="relative z-10">
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">Rental Management</p>
            <h1 className="text-white font-display font-extrabold text-2xl mb-1">Rental Requests</h1>
            <p className="text-white/65 text-sm">Track all rentals — upcoming, active, completed, and cancelled.</p>
          </div>
        </motion.div>

        {/* Summary Mini-cards */}
        <motion.div variants={fadeUp} className="grid grid-cols-4 gap-4 mb-8">
          {SUMMARY_CARDS.map(({ label, value, gradient, icon: Icon }) => (
            <div key={label} className="rounded-xl p-4 text-white flex items-center gap-4"
              style={{ background: gradient }}>
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                <Icon size={18} strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-white/70 text-xs font-bold uppercase tracking-wide">{label}</p>
                <p className="text-xl font-extrabold font-display">{value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Table Card */}
        <motion.div variants={fadeUp} className="bg-white rounded-2xl shadow-ambient border border-surface-dim overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-surface-dim">
            {/* Tabs */}
            <div className="flex items-center gap-1 flex-wrap">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={[
                    "px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-colors cursor-pointer border-0",
                    activeTab === tab
                      ? "bg-amber-500 text-white"
                      : "bg-surface-low text-on-surface/50 hover:bg-surface-mid",
                  ].join(" ")}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} ({counts[tab]})
                </button>
              ))}
            </div>
            {/* Search */}
            <div className="flex items-center gap-2 bg-surface-low rounded-lg px-3 py-2">
              <Search size={14} className="text-on-surface/40" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search rentals…"
                className="bg-transparent border-0 outline-none font-body text-body-md text-on-surface placeholder:text-on-surface/35 w-44"
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-on-surface/30">
              <ClipboardList size={40} strokeWidth={1.2} className="mb-3" />
              <p className="font-body text-body-md">No rentals found.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-dim">
                  {["Status", "Car", "Renter", "Owner", "Dates", "Total"].map((col) => (
                    <th key={col} className="px-6 py-3 text-left font-body text-label-sm uppercase tracking-[0.05em] text-on-surface/40 font-semibold">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <motion.tr
                    key={r.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-[rgba(99,102,120,0.07)] last:border-0 hover:bg-surface-low/40 transition-colors"
                  >
                    <td className="px-6 py-4"><StatusBadge status={r.status} /></td>
                    <td className="px-6 py-4">
                      <span className="font-body font-semibold text-body-md text-on-surface">{r.carModel}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <AvatarInitials initials={r.renterInitials} size="sm" />
                        <span className="font-body text-body-md text-on-surface/70">{r.renter}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-body text-body-md text-on-surface/55">{r.owner}</td>
                    <td className="px-6 py-4">
                      <span className="font-body text-xs text-on-surface/55 bg-surface-low px-2.5 py-1 rounded-md">
                        {r.startDate} → {r.endDate}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-body font-bold text-body-md text-violet-600">{r.total}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </motion.div>

      </motion.div>
    </AdminLayout>
  );
}
