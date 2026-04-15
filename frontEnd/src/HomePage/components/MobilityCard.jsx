import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Clock, Users, Zap } from "lucide-react";
import StatusChip from "../../components/ui/StatusChip";

function StarRating({ rating }) {
  return (
    <span className="flex items-center gap-1 font-body text-body-md font-semibold text-on-surface/80">
      <Star size={12} fill="#003d9b" stroke="none" />
      {rating.toFixed(1)}
    </span>
  );
}

function CardMeta({ icon: Icon, label }) {
  return (
    <span className="flex items-center gap-1.5 font-body text-label-sm uppercase tracking-[0.04em] text-on-surface/45">
      <Icon size={11} strokeWidth={2.5} />
      {label}
    </span>
  );
}

export default function MobilityCard({ car }) {
  const { name, type, price, range, seats, extra, rating, reviews, image } = car;

  const fallbackImage =
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&h=400&q=80";
  const imgSrc = image?.startsWith("http") ? image : fallbackImage;

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="bg-surface-lowest rounded-card overflow-hidden shadow-ambient hover:shadow-deep transition-shadow duration-300 group"
    >
      <div className="bg-surface-low h-48 overflow-hidden relative">
        <img
          src={imgSrc}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <StatusChip label={type} variant="featured" />
        </div>
      </div>

      <div className="bg-surface-high p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-display font-bold text-title-md text-on-surface">{name}</h3>
            <div className="flex items-center gap-1.5 mt-1">
              <StarRating rating={rating} />
              <span className="font-body text-label-sm text-on-surface/40">
                ({reviews} reviews)
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="font-display font-bold text-xl text-primary">${price}</span>
            <span className="font-body text-label-sm text-on-surface/40 block">per day</span>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-5">
          <CardMeta label={range} icon={Clock} />
          <CardMeta label={seats} icon={Users} />
          <CardMeta label={extra} icon={Zap} />
        </div>

        <Link
          to="/renter-explore"
          className="block w-full text-center py-2.5 rounded-md font-body font-semibold text-sm text-primary no-underline transition-all duration-200 hover:bg-primary hover:text-on-primary"
          style={{ background: "rgba(0,61,155,0.08)" }}
        >
          View Details
        </Link>
      </div>
    </motion.article>
  );
}
