import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard({ label, value, trend, trendUp = true, badge, icon: Icon }) {
  const formatted = typeof value === "number" ? value.toLocaleString("en-US") : value;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-surface-bright rounded-xl p-6 shadow-ambient border border-surface-dim flex flex-col gap-3"
    >
      {Icon && (
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <Icon />
        </div>
      )}

      <p className="font-body text-label-sm uppercase tracking-[0.05em] text-on-surface/45">
        {label}
      </p>

      <div className="flex items-center gap-3 flex-wrap">
        <span className="font-display font-bold text-[2rem] leading-none text-on-surface">
          {formatted}
        </span>

        {trend && (
          <span
            className={[
              "flex items-center gap-0.5 font-body font-semibold text-sm",
              trendUp ? "text-emerald-600" : "text-red-500",
            ].join(" ")}
          >
            {trendUp ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
            {trend}
          </span>
        )}

        {badge && (
          <span className="bg-tertiary-fixed text-tertiary font-body text-label-sm uppercase tracking-[0.05em] px-2.5 py-1 rounded-full">
            {badge}
          </span>
        )}
      </div>
    </motion.div>
  );
}
