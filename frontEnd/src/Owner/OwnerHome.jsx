import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  LayoutDashboard,
  Car,
  Clock,
  TrendingUp,
  Users,
  MapPin,
  Settings2,
  Trash2,
  AlertTriangle,
  X,
  RefreshCw,
  PackageSearch,
  DollarSign,
  CheckCircle2,
  Hourglass,
  KeyRound,
} from "lucide-react";
import StatusChip from "../components/ui/StatusChip";
import OwnerPageLayout from "./components/OwnerPageLayout";
import useOwnerHome from "./hooks/useOwnerHome";

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } } };

// ─── Stat card ────────────────────────────────────────────────────────────────

const STAT_CONFIG = [
  { label: "Total Posts", icon: Car, color: "blue" },
  { label: "Active", icon: CheckCircle2, color: "emerald" },
  { label: "Pending", icon: Hourglass, color: "amber" },
  { label: "Rented", icon: KeyRound, color: "violet" },
];

const COLOR_MAP = {
  blue:    { bg: "bg-blue-50",    icon: "text-blue-600",    bar: "from-blue-500 to-blue-400",    value: "text-blue-700"    },
  emerald: { bg: "bg-emerald-50", icon: "text-emerald-600", bar: "from-emerald-500 to-teal-400", value: "text-emerald-700" },
  amber:   { bg: "bg-amber-50",   icon: "text-amber-600",   bar: "from-amber-500 to-yellow-400", value: "text-amber-700"   },
  violet:  { bg: "bg-violet-50",  icon: "text-violet-600",  bar: "from-violet-500 to-purple-400",value: "text-violet-700"  },
};

function StatCard({ label, value, icon: Icon, color }) {
  const c = COLOR_MAP[color];
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -3, transition: { duration: 0.18 } }}
      className="relative overflow-hidden rounded-2xl bg-white border border-slate-200/70 p-5 shadow-[0_2px_12px_rgba(15,23,42,0.06)]"
    >
      <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${c.bar}`} />
      <div className="flex items-start justify-between mb-4">
        <p className="font-inter text-[0.72rem] font-semibold uppercase tracking-widest text-slate-500">
          {label}
        </p>
        <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${c.bg}`}>
          <Icon size={14} className={c.icon} strokeWidth={2} />
        </div>
      </div>
      <p className={`font-display text-[2rem] font-extrabold leading-none ${c.value}`}>{value}</p>
    </motion.article>
  );
}

// ─── Skeleton loader ──────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-white border border-slate-200/70 overflow-hidden animate-pulse">
      <div className="h-2 bg-slate-200 w-full" />
      <div className="p-5 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2 flex-1">
            <div className="h-5 bg-slate-200 rounded-lg w-2/5" />
            <div className="h-3.5 bg-slate-100 rounded-lg w-1/3" />
            <div className="h-3.5 bg-slate-100 rounded-lg w-3/4 mt-2" />
          </div>
          <div className="h-6 w-20 bg-slate-200 rounded-full ml-4" />
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-slate-100 rounded-xl" />
          ))}
        </div>
        <div className="flex gap-2 pt-1">
          <div className="h-9 w-28 bg-slate-200 rounded-xl" />
          <div className="h-9 w-20 bg-slate-100 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 mb-5">
        <PackageSearch size={36} className="text-blue-400" strokeWidth={1.4} />
      </div>
      <h3 className="font-display font-bold text-[1.25rem] text-slate-800 mb-2">
        No listings yet
      </h3>
      <p className="font-inter text-[0.875rem] text-slate-500 max-w-[340px] leading-relaxed mb-6">
        You haven't published any car posts yet. Create your first listing to start earning.
      </p>
      <Link to="/owner/create-post" className="no-underline">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-inter text-[0.875rem] font-semibold text-white shadow-[0_4px_14px_rgba(37,99,235,0.35)] hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus size={15} strokeWidth={2.5} />
          Create First Listing
        </motion.button>
      </Link>
    </motion.div>
  );
}

// ─── Delete confirm modal ─────────────────────────────────────────────────────

function DeleteConfirmModal({ postTitle, onConfirm, onCancel, isDeleting }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 8 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-sm rounded-2xl bg-white border border-slate-200 shadow-[0_24px_64px_rgba(15,23,42,0.18)] p-6"
        >
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <X size={14} strokeWidth={2.5} />
          </button>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 mb-4">
            <AlertTriangle size={22} className="text-red-500" strokeWidth={2} />
          </div>
          <h3 className="font-display font-bold text-[1.1rem] text-slate-900 mb-1">
            Delete listing?
          </h3>
          <p className="font-inter text-[0.85rem] text-slate-500 leading-relaxed mb-5">
            <span className="font-semibold text-slate-700">"{postTitle}"</span> will be permanently
            removed and cannot be recovered.
          </p>
          <div className="flex gap-2">
            <button
              onClick={onCancel}
              className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-inter text-[0.85rem] font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isDeleting}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-red-600 px-4 py-2.5 font-inter text-[0.85rem] font-semibold text-white hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {isDeleting ? (
                <>
                  <RefreshCw size={13} className="animate-spin" strokeWidth={2.5} />
                  Deleting…
                </>
              ) : (
                <>
                  <Trash2 size={13} strokeWidth={2.5} />
                  Delete
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Status configuration ─────────────────────────────────────────────────────

const STATUS_CONFIG = {
  Active:  { variant: "verified", bar: "from-emerald-400 to-teal-500",   badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  Pending: { variant: "pending",  bar: "from-amber-400 to-yellow-500",   badge: "bg-amber-50  text-amber-700  border-amber-200"  },
  Rented:  { variant: "featured", bar: "from-violet-400 to-purple-500",  badge: "bg-violet-50 text-violet-700 border-violet-200" },
};

// ─── Post card ────────────────────────────────────────────────────────────────

function PostCard({ post, onDeleteRequest, isDeleting }) {
  const status = post.ownerRentalStatus;
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.Active;
  const statusVariant = cfg.variant;

  const detailChips = [
    { label: "Type",          value: post.carType,      icon: Car },
    { label: "Transmission",  value: post.transmission, icon: Settings2 },
    { label: "Price / Day",   value: `$${post.rentalPrice}`, icon: DollarSign },
  ];

  return (
    <motion.article
      variants={fadeUp}
      layout
      className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200/70 shadow-[0_2px_12px_rgba(15,23,42,0.05)] hover:shadow-[0_8px_32px_rgba(15,23,42,0.10)] hover:border-slate-300 transition-all duration-300"
    >
      {/* Status color bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${cfg.bar}`} />

      <div className="p-5 md:p-6">
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {/* Car thumbnail */}
            <div className="shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              {post.image ? (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Car size={22} className="text-slate-300" strokeWidth={1.5} />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-[1.05rem] text-slate-900 truncate">
                {post.title}
              </p>
              <p className="mt-0.5 font-inter text-[0.825rem] text-slate-500">
                {post.brand} {post.model}
                {post.year !== "—" && <span> · {post.year}</span>}
              </p>
              {post.description && (
                <p className="mt-2 font-inter text-[0.825rem] text-slate-500 leading-relaxed line-clamp-2 max-w-[520px]">
                  {post.description}
                </p>
              )}
            </div>
          </div>
          <StatusChip label={status} variant={statusVariant} />
        </div>

        {/* Detail chips */}
        <div className="mt-4 flex flex-wrap gap-2">
          {detailChips.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5"
            >
              <Icon size={12} className="text-slate-400 shrink-0" strokeWidth={2} />
              <span className="font-inter text-[0.75rem] text-slate-500">{label}:</span>
              <span className="font-inter text-[0.8rem] font-semibold text-slate-700">{value}</span>
            </div>
          ))}
          {post.location && post.location !== "—" && (
            <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5">
              <MapPin size={12} className="text-slate-400 shrink-0" strokeWidth={2} />
              <span className="font-inter text-[0.8rem] font-semibold text-slate-700">{post.location}</span>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <Link
            to={`/renter-car-detail/${post.id}`}
            className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 font-inter text-[0.8rem] font-semibold text-white no-underline hover:bg-blue-700 transition-colors duration-200 shadow-[0_2px_8px_rgba(37,99,235,0.28)]"
          >
            View Details
          </Link>
          <Link
            to={`/owner/edit-post/${post.id}`}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 font-inter text-[0.8rem] font-semibold text-slate-700 no-underline hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
          >
            <Settings2 size={13} strokeWidth={2} />
            Edit
          </Link>
          <button
            onClick={() => onDeleteRequest(post)}
            disabled={isDeleting}
            className="flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-4 py-2 font-inter text-[0.8rem] font-semibold text-red-600 hover:bg-red-100 hover:border-red-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ml-auto"
          >
            {isDeleting ? (
              <RefreshCw size={13} className="animate-spin" strokeWidth={2.5} />
            ) : (
              <Trash2 size={13} strokeWidth={2} />
            )}
            {isDeleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const STAT_ICONS = [Car, CheckCircle2, Hourglass, KeyRound];
const STAT_COLORS = ["blue", "emerald", "amber", "violet"];

export default function OwnerHome() {
  const { posts, stats, isLoading, error, deletingId, deletePost, refetch } = useOwnerHome();
  const [pendingDelete, setPendingDelete] = useState(null); // post object
  const [deleteError, setDeleteError] = useState(null);

  const statList = [
    { label: "Total Posts", value: stats.totalPosts },
    { label: "Active",      value: stats.active      },
    { label: "Pending",     value: stats.pending     },
    { label: "Rented",      value: stats.rented      },
  ];

  const handleDeleteRequest = (post) => {
    setDeleteError(null);
    setPendingDelete(post);
  };

  const handleDeleteConfirm = async () => {
    if (!pendingDelete) return;
    try {
      await deletePost(pendingDelete.id);
      setPendingDelete(null);
    } catch (err) {
      setDeleteError(err.message);
      setPendingDelete(null);
    }
  };

  return (
    <OwnerPageLayout>
      <motion.div variants={stagger} initial="hidden" animate="show">

        {/* ── Hero banner ── */}
        <motion.section
          variants={fadeUp}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-7 md:p-9 mb-8 shadow-[0_8px_32px_rgba(37,99,235,0.28)]"
        >
          {/* Decorative circles */}
          <div className="absolute -right-16 -top-8 h-56 w-56 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -left-8 bottom-0 h-40 w-40 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute right-24 bottom-4 h-24 w-24 rounded-full bg-blue-500/40 pointer-events-none" />

          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white/20">
                <Car size={12} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="font-inter text-[0.7rem] font-bold uppercase tracking-widest text-blue-200">
                Owner Studio
              </span>
            </div>
            <h1 className="font-display font-extrabold text-[1.75rem] leading-tight text-white md:text-[2.25rem]">
              Your fleet, curated<br className="hidden md:block" /> post by post.
            </h1>
            <p className="mt-3 font-inter text-[0.9rem] text-blue-100 max-w-[480px] leading-relaxed">
              Manage your car listings, monitor rental statuses, and publish new premium offers — all from one place.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link to="/owner/create-post" className="no-underline">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 font-inter text-[0.875rem] font-bold text-blue-700 shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:bg-blue-50 transition-colors duration-200"
                >
                  <Plus size={16} strokeWidth={2.5} />
                  Create Post
                </motion.button>
              </Link>
              <Link
                to="/owner"
                className="flex items-center gap-1.5 font-inter text-[0.875rem] font-semibold text-blue-200 hover:text-white no-underline transition-colors"
              >
                <LayoutDashboard size={15} strokeWidth={2} />
                Open dashboard
              </Link>
            </div>
          </div>
        </motion.section>

        {/* ── Stats ── */}
        <motion.section variants={stagger} className="grid gap-4 grid-cols-2 md:grid-cols-4 mb-8">
          {statList.map((stat, i) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={isLoading ? "—" : stat.value}
              icon={STAT_ICONS[i]}
              color={STAT_COLORS[i]}
            />
          ))}
        </motion.section>

        {/* ── Delete error toast ── */}
        <AnimatePresence>
          {deleteError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle size={15} className="text-red-500 shrink-0" strokeWidth={2} />
                <p className="font-inter text-[0.85rem] text-red-700">{deleteError}</p>
              </div>
              <button
                onClick={() => setDeleteError(null)}
                className="text-red-400 hover:text-red-600 transition-colors"
              >
                <X size={14} strokeWidth={2.5} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Posts list ── */}
        <motion.section
          variants={fadeUp}
          className="rounded-2xl bg-slate-50/80 border border-slate-200/70 p-6 md:p-7"
        >
          {/* Section header */}
          <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600">
                <Car size={14} className="text-white" strokeWidth={2.2} />
              </div>
              <h2 className="font-display font-bold text-[1.1rem] text-slate-900">My Listings</h2>
              {!isLoading && (
                <span className="rounded-full bg-blue-100 px-2.5 py-0.5 font-inter text-[0.75rem] font-bold text-blue-700">
                  {posts.length}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={refetch}
                disabled={isLoading}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 font-inter text-[0.8rem] font-medium text-slate-600 hover:border-slate-300 hover:bg-slate-50 disabled:opacity-50 transition-all"
              >
                <RefreshCw size={13} className={isLoading ? "animate-spin" : ""} strokeWidth={2} />
                Refresh
              </button>
              <Link to="/owner/create-post" className="no-underline">
                <button className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-1.5 font-inter text-[0.8rem] font-semibold text-white hover:bg-blue-700 transition-colors shadow-[0_2px_8px_rgba(37,99,235,0.28)]">
                  <Plus size={13} strokeWidth={2.5} />
                  New Post
                </button>
              </Link>
            </div>
          </div>

          {/* Error state */}
          {error && !isLoading && (
            <motion.div
              variants={fadeUp}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-red-50 mb-4">
                <AlertTriangle size={28} className="text-red-400" strokeWidth={1.5} />
              </div>
              <h3 className="font-display font-bold text-[1.1rem] text-slate-800 mb-2">
                Couldn't load listings
              </h3>
              <p className="font-inter text-[0.85rem] text-slate-500 mb-5 max-w-[320px]">{error}</p>
              <button
                onClick={refetch}
                className="flex items-center gap-2 rounded-xl bg-slate-800 px-5 py-2.5 font-inter text-[0.85rem] font-semibold text-white hover:bg-slate-700 transition-colors"
              >
                <RefreshCw size={14} strokeWidth={2.5} />
                Try again
              </button>
            </motion.div>
          )}

          {/* Loading skeletons */}
          {isLoading && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && !error && posts.length === 0 && <EmptyState />}

          {/* Posts */}
          {!isLoading && !error && posts.length > 0 && (
            <motion.div variants={stagger} className="space-y-4">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onDeleteRequest={handleDeleteRequest}
                  isDeleting={deletingId === post.id}
                />
              ))}
            </motion.div>
          )}
        </motion.section>
      </motion.div>

      {/* Delete confirm modal */}
      {pendingDelete && (
        <DeleteConfirmModal
          postTitle={pendingDelete.title}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setPendingDelete(null)}
          isDeleting={deletingId === pendingDelete.id}
        />
      )}
    </OwnerPageLayout>
  );
}
