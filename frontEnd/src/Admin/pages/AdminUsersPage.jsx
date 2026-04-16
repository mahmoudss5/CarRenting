import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Search, UserCheck, UserX, Shield } from "lucide-react";
import AdminLayout from "../AdminLayout";
import AvatarInitials from "../../components/ui/AvatarInitials";
import ActionButton from "../../components/ui/ActionButton";
import { getAllUsers, approveUser, rejectUser } from "../../services/adminService";

function mapUser(u) {
  const name = u.full_name ?? "";
  const statusRaw = (u.status ?? "").toLowerCase();
  const status =
    statusRaw === "approved" ? "active" :
    statusRaw === "pending"  ? "pending" : "suspended";
  return {
    id: String(u.user_id),
    initials: name.slice(0, 2).toUpperCase() || "??",
    fullName: name,
    email: u.email ?? "",
    role: u.role === "CarOwner" ? "Owner" : u.role,
    status,
    dateRegistered: u.created_at
      ? new Date(u.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      : "—",
  };
}

const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } };

const STATUS_STYLES = {
  active:    { label: "Active",    bg: "#dcfce7", color: "#166534", dot: "#16a34a"  },
  pending:   { label: "Pending",   bg: "#fef9c3", color: "#92400e", dot: "#d97706"  },
  suspended: { label: "Suspended", bg: "#ffe4e6", color: "#9f1239", dot: "#e11d48"  },
};

const ROLE_STYLES = {
  Owner:  { bg: "#ede9fe", color: "#7c3aed" },
  Renter: { bg: "#dbeafe", color: "#1d4ed8" },
};

const TABS = ["all", "pending", "active", "suspended"];

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] ?? STATUS_STYLES.active;
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
      style={{ background: s.bg, color: s.color }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
      {s.label}
    </span>
  );
}

function RoleBadge({ role }) {
  const r = ROLE_STYLES[role] ?? ROLE_STYLES.Renter;
  return (
    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold" style={{ background: r.bg, color: r.color }}>
      {role}
    </span>
  );
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getAllUsers()
      .then((data) => setUsers(Array.isArray(data) ? data.map(mapUser) : []))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const SUMMARY = [
    { label: "Total Users",  value: String(users.length),                                                    gradient: "linear-gradient(135deg,#1d4ed8,#3b82f6)", icon: Users     },
    { label: "Active",       value: String(users.filter((u) => u.status === "active").length),               gradient: "linear-gradient(135deg,#059669,#34d399)", icon: UserCheck },
    { label: "Pending",      value: String(users.filter((u) => u.status === "pending").length),              gradient: "linear-gradient(135deg,#d97706,#f59e0b)", icon: Shield    },
    { label: "Suspended",    value: String(users.filter((u) => u.status === "suspended").length),            gradient: "linear-gradient(135deg,#e11d48,#f87171)", icon: UserX     },
  ];

  const filtered = users.filter((u) => {
    const matchTab = activeTab === "all" || u.status === activeTab;
    const matchSearch =
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const counts = TABS.reduce((acc, t) => {
    acc[t] = t === "all" ? users.length : users.filter((u) => u.status === t).length;
    return acc;
  }, {});

  const approve = async (id) => {
    await approveUser(id).catch(console.error);
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, status: "active" } : u));
  };
  const suspend = async (id) => {
    await rejectUser(id, "Account suspended by admin.").catch(console.error);
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, status: "suspended" } : u));
  };

  return (
    <AdminLayout>
      <motion.div variants={stagger} initial="hidden" animate="show">

        {/* Header */}
        <motion.div variants={fadeUp}
          className="rounded-2xl p-7 mb-8 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)" }}>
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10"
            style={{ background: "white", transform: "translate(30%,-30%)" }} />
          <div className="relative z-10">
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">User Management</p>
            <h1 className="text-white font-display font-extrabold text-2xl mb-1">Users</h1>
            <p className="text-white/65 text-sm">Manage all registered users, approve owners, and moderate accounts.</p>
          </div>
        </motion.div>

        {/* Summary Cards */}
        <motion.div variants={fadeUp} className="grid grid-cols-4 gap-4 mb-8">
          {SUMMARY.map(({ label, value, gradient, icon: Icon }) => (
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
            <div className="flex items-center gap-1">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={[
                    "px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-colors cursor-pointer border-0",
                    activeTab === tab
                      ? "text-white"
                      : "bg-surface-low text-on-surface/50 hover:bg-surface-mid",
                  ].join(" ")}
                  style={activeTab === tab ? { background: "linear-gradient(135deg,#7c3aed,#a78bfa)" } : {}}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} ({counts[tab]})
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 bg-surface-low rounded-lg px-3 py-2">
              <Search size={14} className="text-on-surface/40" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users…"
                className="bg-transparent border-0 outline-none font-body text-body-md text-on-surface placeholder:text-on-surface/35 w-44"
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-on-surface/30">
              <Users size={40} strokeWidth={1.2} className="mb-3" />
              <p className="font-body text-body-md">No users found.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-dim">
                  {["User", "Email", "Role", "Status", "Registered", "Actions"].map((col) => (
                    <th key={col} className="px-6 py-3 text-left font-body text-label-sm uppercase tracking-[0.05em] text-on-surface/40 font-semibold">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, i) => (
                  <motion.tr
                    key={u.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-[rgba(99,102,120,0.07)] last:border-0 hover:bg-surface-low/40 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <AvatarInitials initials={u.initials} />
                        <span className="font-body font-semibold text-body-md text-on-surface">{u.fullName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-body text-body-md text-on-surface/55">{u.email}</td>
                    <td className="px-6 py-4"><RoleBadge role={u.role} /></td>
                    <td className="px-6 py-4"><StatusBadge status={u.status} /></td>
                    <td className="px-6 py-4 font-body text-body-md text-on-surface/55">{u.dateRegistered}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {u.status === "pending" && (
                          <ActionButton label="Approve" variant="approve" onClick={() => approve(u.id)} />
                        )}
                        {u.status !== "suspended" && (
                          <ActionButton label="Suspend" variant="reject" onClick={() => suspend(u.id)} />
                        )}
                        {u.status === "suspended" && (
                          <ActionButton label="Restore" variant="review" onClick={() => approve(u.id)} />
                        )}
                      </div>
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
