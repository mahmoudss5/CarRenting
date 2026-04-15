import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Plus,
  LayoutDashboard,
  Car,
  Clock,
  TrendingUp,
  Fuel,
  Users,
  MapPin,
  Calendar,
} from "lucide-react";
import PrimaryButton from "../components/ui/PrimaryButton";
import StatusChip from "../components/ui/StatusChip";
import OwnerPageLayout from "./components/OwnerPageLayout";
import useOwnerHome from "./hooks/useOwnerHome";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const STAT_ICONS = [TrendingUp, Car, Clock, Users];

function StatCard({ label, value, icon: Icon, index }) {
  const gradient = index % 2 === 0 ? "from-primary to-blue-400" : "from-tertiary to-pink-400";
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -2 }}
      className="relative overflow-hidden rounded-xl bg-surface-bright p-5 shadow-ambient border border-surface-dim"
    >
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${gradient} opacity-80`} />
      <div className="flex items-start justify-between mb-3">
        <p className="font-body text-label-sm uppercase text-on-surface/55">{label}</p>
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon size={15} className="text-primary" strokeWidth={1.8} />
        </div>
      </div>
      <p className="font-display text-display-sm text-on-surface">{value}</p>
    </motion.article>
  );
}

function PostCard({ post, index }) {
  const statusVariant =
    post.ownerRentalStatus === "Active"
      ? "verified"
      : post.ownerRentalStatus === "Pending"
      ? "pending"
      : "featured";

  return (
    <motion.article
      variants={fadeUp}
      className="relative overflow-hidden rounded-xl bg-surface-lowest border border-surface-dim p-5 md:p-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-primary/30 transition-all duration-300"
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-display text-title-md text-on-surface">{post.title}</p>
          <p className="mt-1 font-body text-body-md text-on-surface/60">
            {post.brand} {post.model} · {post.year}
          </p>
          <p className="mt-2 font-body text-body-md text-on-surface/70 max-w-[460px] line-clamp-2">
            {post.description}
          </p>
        </div>
        <StatusChip label={post.ownerRentalStatus} variant={statusVariant} />
      </div>

      <div className="mt-5 grid gap-3 grid-cols-2 md:grid-cols-3">
        {[
          { label: "Car Type", value: post.carType, icon: Car },
          { label: "Transmission", value: post.transmission, icon: TrendingUp },
          { label: "Price / Day", value: `$${post.rentalPrice}`, icon: TrendingUp },
          { label: "Fuel Type", value: post.fuelType, icon: Fuel },
          { label: "Seats", value: post.seats, icon: Users },
          { label: "Mileage", value: post.mileage, icon: MapPin },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-lg bg-surface-lowest border border-surface-dim p-3.5">
            <div className="flex items-center gap-1.5 mb-1">
              <Icon size={12} className="text-on-surface/40" strokeWidth={1.8} />
              <p className="font-body text-label-sm uppercase text-on-surface/50">{label}</p>
            </div>
            <p className="font-body text-body-md text-on-surface font-medium">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg bg-surface-high border border-surface-dim p-4">
        <div className="flex items-center gap-2 mb-1">
          <MapPin size={12} className="text-on-surface/40" strokeWidth={1.8} />
          <p className="font-body text-label-sm uppercase text-on-surface/55">Post Details</p>
        </div>
        <p className="font-body text-body-md text-on-surface/70">
          Owner: {post.ownerName} · Location: {post.location}
        </p>
        <p className="mt-1 font-body text-body-md text-on-surface/70">
          Availability: {post.availability} · Min Rental: {post.minRentalDays} day(s)
        </p>
      </div>
    </motion.article>
  );
}

export default function OwnerHome() {
  const { posts, stats } = useOwnerHome();

  const statList = [
    { label: "Total Posts", value: stats.totalPosts },
    { label: "Active", value: stats.active },
    { label: "Pending", value: stats.pending },
    { label: "Rented", value: stats.rented },
  ];

  return (
    <OwnerPageLayout>
      <motion.div variants={stagger} initial="hidden" animate="show">
        {/* Hero Banner */}
        <motion.section
          variants={fadeUp}
          className="relative overflow-hidden rounded-2xl bg-surface-low border border-surface-dim p-6 md:p-8 mb-8"
        >
          <div className="absolute -right-14 top-6 h-48 w-48 rounded-full bg-primary/25 blur-3xl pointer-events-none" />
          <div className="absolute -left-10 bottom-6 h-40 w-40 rounded-full bg-tertiary/20 blur-3xl pointer-events-none" />
          <div className="glass-surface relative max-w-[760px] rounded-xl p-6 shadow-ambient">
            <div className="flex items-center gap-2 mb-2">
              <Car size={16} className="text-primary" strokeWidth={1.8} />
              <p className="font-body text-label-sm uppercase text-primary tracking-[0.05em]">Owner Studio</p>
            </div>
            <h1 className="mt-1 font-display text-display-sm text-on-surface md:text-display-lg">
              Your fleet, curated post by post.
            </h1>
            <p className="mt-3 font-body text-body-md text-on-surface/70 max-w-[480px] leading-relaxed">
              Manage your car listings, monitor rental statuses, and publish new premium offers from one place.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <Link to="/owner/create-post" className="no-underline">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <PrimaryButton fullWidth={false} className="flex items-center gap-1.5 px-6 py-2.5">
                    <Plus size={16} strokeWidth={2.2} />
                    Create Post
                  </PrimaryButton>
                </motion.div>
              </Link>
              <Link
                to="/owner"
                className="flex items-center gap-1.5 font-body text-body-md text-on-surface/60 hover:text-primary no-underline transition-colors"
              >
                <LayoutDashboard size={15} strokeWidth={1.8} />
                Open dashboard
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section
          variants={stagger}
          className="grid gap-4 grid-cols-2 md:grid-cols-4 mb-8"
        >
          {statList.map((stat, i) => (
            <StatCard key={stat.label} {...stat} icon={STAT_ICONS[i]} index={i} />
          ))}
        </motion.section>

        {/* Posts List */}
        <motion.section
          variants={fadeUp}
          className="rounded-2xl bg-surface-dim border border-surface-dim p-6 md:p-7"
        >
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Car size={18} className="text-on-surface/60" strokeWidth={1.8} />
              <h2 className="font-display text-headline-sm text-on-surface">Owner Posts</h2>
              <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded-full font-body">
                {posts.length}
              </span>
            </div>
            <Link
              to="/owner"
              className="flex items-center gap-1.5 font-body text-body-md text-primary no-underline hover:underline underline-offset-2"
            >
              <LayoutDashboard size={14} strokeWidth={1.8} />
              Open dashboard
            </Link>
          </div>

          <motion.div variants={stagger} className="space-y-4">
            {posts.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </motion.div>
        </motion.section>
      </motion.div>
    </OwnerPageLayout>
  );
}
