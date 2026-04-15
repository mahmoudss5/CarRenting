import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Car, Users, Star, Clock } from "lucide-react";

const STATS = [
  { value: "100+", label: "Premium Vehicles", icon: Car },
  { value: "500+", label: "Trusted Members", icon: Users },
  { value: "4.9★", label: "Average Rating", icon: Star },
  { value: "24/7", label: "Customer Support", icon: Clock },
];

function StatItem({ value, label, icon: Icon, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center gap-2 px-8 first:pl-0 last:pr-0"
    >
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-1">
        <Icon size={18} className="text-primary" />
      </div>
      <span className="font-display font-bold text-2xl text-primary">{value}</span>
      <span className="font-body text-label-sm uppercase tracking-[0.05em] text-on-surface/50">
        {label}
      </span>
    </motion.div>
  );
}

export default function StatsBar() {
  return (
    <section className="bg-surface-bright shadow-float border-b border-surface-dim">
      <div className="max-w-screen-xl mx-auto px-8 lg:px-16 py-10">
        <div className="flex items-center justify-center flex-wrap gap-y-8 divide-x divide-surface-dim">
          {STATS.map((stat, i) => (
            <StatItem key={i} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
