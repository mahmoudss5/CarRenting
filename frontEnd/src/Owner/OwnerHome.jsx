import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, LayoutDashboard, Car, Clock, TrendingUp, Users, MapPin,
  Settings2, Trash2, AlertTriangle, X, RefreshCw, PackageSearch,
  DollarSign, CheckCircle2, Hourglass, KeyRound, Search, Filter
} from "lucide-react";
import OwnerPageLayout from "./components/OwnerPageLayout";
import useOwnerHome from "./hooks/useOwnerHome";

// ─── Animations ─────────────────────────────────────────────────────────────
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } };
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

// ─── Stat Card ──────────────────────────────────────────────────────────────
const STAT_CONFIG = [
  { label: "Total Posts", icon: Car, color: "blue" },
  { label: "Active", icon: CheckCircle2, color: "emerald" },
  { label: "Pending", icon: Hourglass, color: "amber" },
  { label: "Rented", icon: KeyRound, color: "violet" }
];

const COLOR_MAP = {
  blue: { bg: "bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-400", icon: "text-white", text: "text-white", label: "text-white/80" },
  emerald: { bg: "bg-gradient-to-br from-emerald-400 to-teal-500 border-emerald-400", icon: "text-white", text: "text-white", label: "text-white/80" },
  amber: { bg: "bg-gradient-to-br from-amber-400 to-orange-500 border-amber-400", icon: "text-white", text: "text-white", label: "text-white/80" },
  violet: { bg: "bg-gradient-to-br from-violet-500 to-purple-600 border-violet-400", icon: "text-white", text: "text-white", label: "text-white/80" }
};

function StatCard({ label, value, icon: Icon, color }) {
  const c = COLOR_MAP[color];
  return (
    <motion.div variants={fadeUp} className={`group relative overflow-hidden rounded-3xl p-6 shadow-[0_4px_15px_rgba(0,0,0,0.05)] border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${c.bg}`}>
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white opacity-10 pointer-events-none group-hover:scale-125 transition-transform duration-500" />
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className={`p-3 rounded-2xl bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-colors duration-300`}>
          <Icon size={20} className={c.icon} strokeWidth={2.5} />
        </div>
      </div>
      <div className="relative z-10">
        <h3 className={`font-display text-4xl font-extrabold ${c.text}`}>{value}</h3>
        <p className={`font-body text-sm font-semibold uppercase tracking-wider mt-1 ${c.label}`}>{label}</p>
      </div>
    </motion.div>
  );
}

// ─── Skeletons & Empty States ───────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-white border border-gray-100 overflow-hidden shadow-sm animate-pulse flex flex-col h-[380px]">
      <div className="h-48 bg-gray-200" />
      <div className="p-5 flex-1 flex flex-col space-y-4">
        <div className="h-6 bg-gray-200 rounded w-2/3" />
        <div className="h-4 bg-gray-100 rounded w-1/2" />
        <div className="mt-auto flex gap-2">
          <div className="h-10 bg-gray-200 rounded-lg flex-1" />
          <div className="h-10 bg-gray-100 rounded-lg flex-1" />
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white rounded-3xl border border-dashed border-gray-200 col-span-full">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 mb-5">
        <PackageSearch size={36} className="text-blue-500" strokeWidth={1.5} />
      </div>
      <h3 className="font-display font-bold text-xl text-gray-900 mb-2">No listings found</h3>
      <p className="font-body text-sm text-gray-500 max-w-[340px] leading-relaxed mb-6">
        Try adjusting your filters, or create a new car listing to start your fleet.
      </p>
      <Link to="/owner/create-post" className="no-underline">
        <button className="flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 font-body text-sm font-semibold text-white shadow-lg hover:bg-gray-800 transition-colors">
          <Plus size={16} strokeWidth={2.5} /> Add New Listing
        </button>
      </Link>
    </div>
  );
}

// ─── Delete Modal ───────────────────────────────────────────────────────────
function DeleteConfirmModal({ postTitle, onConfirm, onCancel, isDeleting }) {
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm" onClick={onCancel}>
        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} onClick={e => e.stopPropagation()} className="relative w-full max-w-sm rounded-3xl bg-white p-7 shadow-2xl">
          <button onClick={onCancel} className="absolute top-5 right-5 text-gray-400 hover:text-gray-600"><X size={20} /></button>
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-5"><AlertTriangle size={24} className="text-red-500" /></div>
          <h3 className="font-display text-xl font-bold text-gray-900 mb-2">Delete listing?</h3>
          <p className="font-body text-sm text-gray-500 mb-6">Are you sure you want to permanently remove <span className="font-semibold text-gray-800">"{postTitle}"</span>? This action cannot be undone.</p>
          <div className="flex gap-3">
            <button onClick={onCancel} className="flex-1 py-3 px-4 rounded-xl font-body text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200">Cancel</button>
            <button onClick={onConfirm} disabled={isDeleting} className="flex-1 py-3 px-4 rounded-xl font-body text-sm font-semibold text-white bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2 disabled:opacity-70">
              {isDeleting ? <RefreshCw size={16} className="animate-spin" /> : <Trash2 size={16} />}
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Improved Post Card ─────────────────────────────────────────────────────
const STATUS_CONFIG = {
  Active: { label: "Active", bg: "bg-emerald-500" },
  Pending: { label: "Pending Review", bg: "bg-amber-500" },
  Rented: { label: "Rented", bg: "bg-violet-500" }
};

function PostCard({ post, onDeleteRequest, isDeleting }) {
  const status = post.ownerRentalStatus;
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.Active;

  return (
    <motion.article 
      layout 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300"
    >
      {/* Cover Image */}
      <div className="relative h-48 sm:h-52 w-full bg-gray-100 overflow-hidden">
        {post.image ? (
          <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
            <Car size={32} strokeWidth={1} className="mb-2 opacity-50" />
            <span className="text-xs font-medium uppercase tracking-wider">No Image</span>
          </div>
        )}
        {/* Floating Status Pill */}
        <div className="absolute top-4 left-4">
          <div className={`px-3 py-1.5 rounded-full backdrop-blur-md bg-white/90 shadow-sm flex items-center gap-1.5`}>
            <span className={`w-2 h-2 rounded-full ${cfg.bg}`} />
            <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">{cfg.label}</span>
          </div>
        </div>
        {/* Price Bubble */}
        <div className="absolute bottom-4 right-4 bg-gray-900 text-white px-3 py-1.5 rounded-xl font-display font-bold text-sm shadow-lg">
          ${post.rentalPrice} <span className="text-gray-400 font-body text-xs font-normal">/ day</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-display text-lg font-bold text-gray-900 leading-tight mb-1">{post.title}</h3>
        <p className="font-body text-sm text-gray-500 mb-4">{post.brand} {post.model} {post.year !== "—" && `· ${post.year}`}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-50 border border-gray-100 text-xs font-semibold text-gray-600"><Car size={10} /> {post.carType}</span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-50 border border-gray-100 text-xs font-semibold text-gray-600"><Settings2 size={10} /> {post.transmission}</span>
          {post.location && post.location !== "—" && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-50 border border-gray-100 text-xs font-semibold text-gray-600 truncate max-w-[120px]"><MapPin size={10} className="shrink-0" /> {post.location}</span>}
        </div>

        {/* Actions */}
        <div className="mt-auto grid grid-cols-2 gap-2 pt-4 border-t border-gray-100">
          <Link to={`/owner/edit-post/${post.id}`} className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-colors">
            <Settings2 size={14} /> Edit
          </Link>
          <button onClick={() => onDeleteRequest(post)} disabled={isDeleting} className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 transition-colors disabled:opacity-50">
            {isDeleting ? <RefreshCw size={14} className="animate-spin" /> : <Trash2 size={14} />}
            Delete
          </button>
        </div>
      </div>
    </motion.article>
  );
}

const STAT_ICONS = [Car, CheckCircle2, Hourglass, KeyRound];
const STAT_COLORS = ["blue", "emerald", "amber", "violet"];

export default function OwnerHome() {
  const { posts, stats, isLoading, error, deletingId, deletePost, refetch } = useOwnerHome();
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  
  // Client-side filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const statList = [
    { label: "Total Fleet", value: stats.totalPosts },
    { label: "Live Listings", value: stats.active },
    { label: "Pending Approvals", value: stats.pending },
    { label: "Currently Rented", value: stats.rented },
  ];

  // Apply filters
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.brand.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.model.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === "All" || post.ownerRentalStatus === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [posts, searchQuery, statusFilter]);

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
      <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-[1400px] mx-auto py-8">
        
        {/* Header Section */}
        <div className="relative overflow-hidden flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-[0_8px_30px_rgba(79,70,229,0.2)]">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-white opacity-10 blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-sm">Fleet Overview</h1>
            <p className="font-body text-white/80 mt-3 text-sm sm:text-base max-w-2xl leading-relaxed">Manage your premium car listings, monitor performance, and expand your inventory right from your dashboard.</p>
          </div>
          <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
            <Link to="/owner" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold hover:bg-white/20 shadow-sm transition-all text-sm">
              <LayoutDashboard size={16} /> Inbox
            </Link>
            <Link to="/owner/create-post" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-indigo-700 font-bold hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all text-sm">
              <Plus size={16} strokeWidth={2.5} /> New Listing
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {statList.map((stat, i) => (
            <StatCard key={stat.label} label={stat.label} value={isLoading ? "-" : stat.value} icon={STAT_ICONS[i]} color={STAT_COLORS[i]} />
          ))}
        </motion.div>

        {/* Error Toast */}
        <AnimatePresence>
          {deleteError && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mb-6">
              <div className="flex items-center justify-between p-4 bg-red-50 border border-red-100 rounded-2xl">
                <div className="flex items-center gap-3 text-red-700 font-medium text-sm">
                  <AlertTriangle size={18} /> {deleteError}
                </div>
                <button onClick={() => setDeleteError(null)} className="text-red-400 hover:text-red-700"><X size={16}/></button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search listings by make, model, or title..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm font-body text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all shadow-sm"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
             <div className="relative w-full sm:w-auto">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full sm:w-auto appearance-none bg-white border border-gray-200 text-gray-700 py-3 pl-9 pr-10 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-gray-900 shadow-sm cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending Review</option>
                  <option value="Rented">Rented</option>
                </select>
             </div>
             <button onClick={refetch} className="p-3 rounded-xl border border-gray-200 bg-white text-gray-500 hover:text-gray-900 shadow-sm transition-colors shrink-0" title="Refresh Listings">
               <RefreshCw size={18} className={isLoading ? "animate-spin text-gray-900" : ""} />
             </button>
          </div>
        </div>

        {/* Listings Grid */}
        {error && !isLoading ? (
          <div className="text-center py-20 bg-red-50 rounded-3xl border border-red-100">
            <p className="text-red-600 font-semibold mb-4">{error}</p>
            <button onClick={refetch} className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold shadow hover:bg-red-700">Try Again</button>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredPosts.length === 0 ? (
                <EmptyState />
              ) : (
                filteredPosts.map(post => (
                  <PostCard key={post.id} post={post} onDeleteRequest={handleDeleteRequest} isDeleting={deletingId === post.id} />
                ))
              )}
            </AnimatePresence>
          </motion.div>
        )}

      </motion.div>

      {pendingDelete && (
        <DeleteConfirmModal postTitle={pendingDelete.title} onConfirm={handleDeleteConfirm} onCancel={() => setPendingDelete(null)} isDeleting={deletingId === pendingDelete.id} />
      )}
    </OwnerPageLayout>
  );
}
