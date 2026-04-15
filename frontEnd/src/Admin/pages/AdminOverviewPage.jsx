import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Users, Car, DollarSign, AlertCircle,
  CheckCircle2, Clock, TrendingUp, ArrowRight,
  ShieldCheck, ClipboardList,
} from "lucide-react";
import AdminLayout from "../AdminLayout";

const stagger = { show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };
const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const STAT_CARDS = [
  {
    label: "Total Users",
    value: "1,284",
    trend: "+12%",
    trendUp: true,
    icon: Users,
    gradient: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)",
    glow: "rgba(59,130,246,0.25)",
  },
  {
    label: "Active Cars",
    value: "342",
    trend: "+5.2%",
    trendUp: true,
    icon: Car,
    gradient: "linear-gradient(135deg, #059669 0%, #34d399 100%)",
    glow: "rgba(52,211,153,0.25)",
  },
  {
    label: "Total Revenue",
    value: "$28,540",
    trend: "+18%",
    trendUp: true,
    icon: DollarSign,
    gradient: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
    glow: "rgba(167,139,250,0.25)",
  },
  {
    label: "Pending Actions",
    value: "7",
    badge: "Needs Review",
    icon: AlertCircle,
    gradient: "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)",
    glow: "rgba(245,158,11,0.25)",
  },
];

const ACTIVITY = [
  { icon: CheckCircle2, iconBg: "#dcfce7", iconColor: "#16a34a", text: "Porsche Taycan approved by admin",      time: "2 min ago"  },
  { icon: Users,        iconBg: "#dbeafe", iconColor: "#2563eb", text: "New user registered: Sofia Martinez",   time: "15 min ago" },
  { icon: AlertCircle,  iconBg: "#fef9c3", iconColor: "#d97706", text: "Verification request from Sophia P.",  time: "32 min ago" },
  { icon: Car,          iconBg: "#ede9fe", iconColor: "#7c3aed", text: "BMW i7 M70 submitted for review",      time: "1 hr ago"   },
  { icon: Clock,        iconBg: "#ffe4e6", iconColor: "#e11d48", text: "Rental #R-042 is overdue by 2 days",   time: "2 hr ago"   },
  { icon: ShieldCheck,  iconBg: "#cffafe", iconColor: "#0891b2", text: "Aaron Wright's license verified",      time: "3 hr ago"   },
];

const QUICK_ACTIONS = [
  { label: "Review Car Posts",    sub: "3 pending",        to: "/admin/cars",          icon: Car,          gradient: "linear-gradient(135deg,#1d4ed8,#3b82f6)" },
  { label: "Verify Identities",   sub: "2 pending",        to: "/admin/verifications", icon: ShieldCheck,  gradient: "linear-gradient(135deg,#7c3aed,#a78bfa)" },
  { label: "Active Rentals",      sub: "5 rentals",        to: "/admin/rentals",       icon: ClipboardList, gradient: "linear-gradient(135deg,#059669,#34d399)" },
];

function ColorStatCard({ label, value, trend, trendUp, badge, icon: Icon, gradient, glow }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, scale: 1.02 }}
      className="rounded-2xl p-6 text-white flex flex-col gap-4 relative overflow-hidden"
      style={{ background: gradient, boxShadow: `0 8px 32px -8px ${glow}` }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
        style={{ background: "white", transform: "translate(30%, -30%)" }} />
      <div className="flex items-start justify-between relative z-10">
        <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
          <Icon size={20} strokeWidth={1.8} />
        </div>
        {trend && (
          <span className="flex items-center gap-1 text-xs font-bold bg-white/20 px-2.5 py-1 rounded-full">
            <TrendingUp size={11} /> {trend}
          </span>
        )}
        {badge && (
          <span className="text-xs font-bold bg-white/25 px-2.5 py-1 rounded-full">{badge}</span>
        )}
      </div>
      <div className="relative z-10">
        <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
        <p className="text-3xl font-extrabold font-display">{value}</p>
      </div>
    </motion.div>
  );
}

export default function AdminOverviewPage() {
  return (
    <AdminLayout>
      <motion.div variants={stagger} initial="hidden" animate="show">

        {/* Hero Banner */}
        <motion.div
          variants={fadeUp}
          className="rounded-2xl p-8 mb-8 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #003d9b 0%, #0052cc 50%, #7c4dff 100%)" }}
        >
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 80% 50%, white 0%, transparent 60%)" }} />
          <div className="absolute top-4 right-8 w-40 h-40 rounded-full opacity-5"
            style={{ background: "white" }} />
          <div className="relative z-10">
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">Admin Console</p>
            <h1 className="text-white font-display font-extrabold text-3xl mb-2">Platform Overview</h1>
            <p className="text-white/65 text-sm max-w-md leading-relaxed">
              Real-time snapshot of DriveShare operations — monitor users, fleet activity, and revenue.
            </p>
          </div>
        </motion.div>

        {/* Stat Cards */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {STAT_CARDS.map((card) => (
            <ColorStatCard key={card.label} {...card} />
          ))}
        </motion.div>

        {/* Bottom columns */}
        <div className="grid grid-cols-[1fr_280px] gap-6">

          {/* Recent Activity */}
          <motion.div variants={fadeUp} className="bg-white rounded-2xl shadow-ambient border border-surface-dim p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-bold text-lg text-on-surface">Recent Activity</h2>
              <span className="text-xs font-semibold text-primary bg-primary/8 px-3 py-1 rounded-full">Live</span>
            </div>
            <div className="flex flex-col">
              {ACTIVITY.map(({ icon: Icon, iconBg, iconColor, text, time }, i) => (
                <div key={i} className="flex items-center gap-4 py-3.5 border-b border-surface-dim last:border-0">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: iconBg }}>
                    <Icon size={15} style={{ color: iconColor }} strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm text-on-surface font-medium truncate">{text}</p>
                    <p className="font-body text-xs text-on-surface/40 mt-0.5">{time}</p>
                  </div>
                  <ArrowRight size={13} className="text-on-surface/25 shrink-0" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <h2 className="font-display font-bold text-lg text-on-surface">Quick Actions</h2>
            {QUICK_ACTIONS.map(({ label, sub, to, icon: Icon, gradient }) => (
              <Link
                key={to}
                to={to}
                className="no-underline rounded-2xl p-5 text-white block hover:scale-[1.02] transition-transform"
                style={{ background: gradient, boxShadow: "0 4px 16px -4px rgba(0,0,0,0.15)" }}
              >
                <Icon size={22} className="mb-3 opacity-80" strokeWidth={1.8} />
                <p className="font-bold text-base">{label}</p>
                <p className="text-white/60 text-xs mt-0.5">{sub}</p>
              </Link>
            ))}
          </motion.div>

        </div>
      </motion.div>
    </AdminLayout>
  );
}
