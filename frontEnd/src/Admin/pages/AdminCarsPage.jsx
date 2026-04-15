import { useState } from "react";
import { motion } from "framer-motion";
import { Car, Search, Filter } from "lucide-react";
import AdminLayout from "../AdminLayout";
import { INITIAL_CAR_POSTS } from "../mockData";
import ActionButton from "../../components/ui/ActionButton";
import AvatarInitials from "../../components/ui/AvatarInitials";

const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } };

const STATUS_STYLES = {
  pending:  { label: "Pending",  bg: "#fef9c3", color: "#92400e",  dot: "#d97706" },
  approved: { label: "Approved", bg: "#dcfce7", color: "#166534",  dot: "#16a34a" },
  rejected: { label: "Rejected", bg: "#ffe4e6", color: "#9f1239",  dot: "#e11d48" },
};

const CATEGORY_COLORS = {
  Electric: { bg: "#dbeafe", color: "#1d4ed8" },
  Luxury:   { bg: "#ede9fe", color: "#7c3aed" },
  SUV:      { bg: "#dcfce7", color: "#166534" },
  Sports:   { bg: "#ffe4e6", color: "#9f1239" },
};

const TABS = ["all", "pending", "approved", "rejected"];

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] ?? STATUS_STYLES.pending;
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
      style={{ background: s.bg, color: s.color }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
      {s.label}
    </span>
  );
}

function CategoryBadge({ category }) {
  const c = CATEGORY_COLORS[category] ?? { bg: "#f3f4f6", color: "#374151" };
  return (
    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: c.bg, color: c.color }}>
      {category}
    </span>
  );
}

export default function AdminCarsPage() {
  const [cars, setCars] = useState(INITIAL_CAR_POSTS);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = cars.filter((c) => {
    const matchTab = activeTab === "all" || c.status === activeTab;
    const matchSearch = c.carModel.toLowerCase().includes(search.toLowerCase()) ||
      c.owner.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const counts = TABS.reduce((acc, t) => {
    acc[t] = t === "all" ? cars.length : cars.filter((c) => c.status === t).length;
    return acc;
  }, {});

  const approve = (id) => setCars((prev) => prev.map((c) => c.id === id ? { ...c, status: "approved" } : c));
  const reject  = (id) => setCars((prev) => prev.map((c) => c.id === id ? { ...c, status: "rejected" } : c));

  return (
    <AdminLayout>
      <motion.div variants={stagger} initial="hidden" animate="show">

        {/* Header */}
        <motion.div variants={fadeUp}
          className="rounded-2xl p-7 mb-8 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #059669 0%, #34d399 100%)" }}>
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10"
            style={{ background: "white", transform: "translate(30%,-30%)" }} />
          <div className="relative z-10">
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">Fleet Management</p>
            <h1 className="text-white font-display font-extrabold text-2xl mb-1">Car Posts</h1>
            <p className="text-white/65 text-sm">Review, approve, or reject submitted vehicle listings.</p>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div variants={fadeUp} className="bg-white rounded-2xl shadow-ambient border border-surface-dim mb-6 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-surface-dim">
            {/* Tabs */}
            <div className="flex items-center gap-1">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={[
                    "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-colors cursor-pointer border-0",
                    activeTab === tab
                      ? "bg-primary text-white"
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
                placeholder="Search cars or owners…"
                className="bg-transparent border-0 outline-none font-body text-body-md text-on-surface placeholder:text-on-surface/35 w-48"
              />
            </div>
          </div>

          {/* Table */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-on-surface/30">
              <Car size={40} strokeWidth={1.2} className="mb-3" />
              <p className="font-body text-body-md">No car posts found.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-dim">
                  {["Status", "Car Model", "Category", "Owner", "Price / Day", "Date Submitted", "Actions"].map((col) => (
                    <th key={col} className="px-6 py-3 text-left font-body text-label-sm uppercase tracking-[0.05em] text-on-surface/40 font-semibold">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <motion.tr
                    key={c.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-[rgba(99,102,120,0.07)] last:border-0 hover:bg-surface-low/40 transition-colors"
                  >
                    <td className="px-6 py-4"><StatusBadge status={c.status} /></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                          <Car size={16} className="text-emerald-600" strokeWidth={1.8} />
                        </div>
                        <span className="font-body font-semibold text-body-md text-on-surface">{c.carModel}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4"><CategoryBadge category={c.category} /></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <AvatarInitials initials={c.owner.slice(0, 2).toUpperCase()} size="sm" />
                        <span className="font-body text-body-md text-on-surface/65">{c.owner}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-body font-semibold text-body-md text-emerald-600">{c.pricePerDay}</td>
                    <td className="px-6 py-4 font-body text-body-md text-on-surface/55">{c.dateSubmitted}</td>
                    <td className="px-6 py-4">
                      {c.status === "pending" ? (
                        <div className="flex items-center gap-2">
                          <ActionButton label="Approve" variant="approve" onClick={() => approve(c.id)} />
                          <ActionButton label="Reject"  variant="reject"  onClick={() => reject(c.id)} />
                        </div>
                      ) : (
                        <span className="font-body text-label-sm text-on-surface/30 uppercase tracking-wide">—</span>
                      )}
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
