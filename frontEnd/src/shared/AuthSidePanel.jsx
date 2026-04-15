import { motion } from "framer-motion";
import { Car, ShieldCheck, BadgeCheck } from "lucide-react";

const FEATURE_CARDS = [
  {
    icon: Car,
    title: "100+ Premium Vehicles",
    body: "Access everything from electric city cars to vintage collectibles.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Local Owners",
    body: "Every host is vetted for safety and exceptional service quality.",
  },
  {
    icon: BadgeCheck,
    title: "Full Insurance Coverage",
    body: "Drive with peace of mind. Every trip is fully protected by our partners.",
  },
];

function FeatureCard({ icon: Icon, title, body, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
      className="glass-dark rounded-lg p-4 flex items-start gap-3 border border-white/10"
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-md bg-white/10 flex items-center justify-center text-white/80 mt-0.5">
        <Icon size={16} strokeWidth={1.8} />
      </div>
      <div>
        <p className="font-display font-bold text-sm text-white">{title}</p>
        <p className="font-body text-body-md text-white/55 mt-0.5 leading-snug">{body}</p>
      </div>
    </motion.div>
  );
}

export default function AuthSidePanel() {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #001f5c 0%, #003d9b 40%, #141b2c 100%)",
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity"
      />

      {/* decorative circles */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-20 -left-10 w-40 h-40 rounded-full bg-blue-400/10 blur-2xl" />

      <div className="relative z-10 flex flex-col justify-between h-full p-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-body text-label-sm uppercase tracking-[0.05em] text-white/50 mb-2">
            Why DriveShare
          </p>
          <h2 className="font-display text-display-sm text-white font-bold leading-tight">
            The premium<br />
            <span style={{ color: "#7aadff" }}>mobility</span> platform.
          </h2>
        </motion.div>

        <div className="flex flex-col gap-3 my-8">
          {FEATURE_CARDS.map((card, i) => (
            <FeatureCard key={card.title} {...card} index={i} />
          ))}
        </div>

        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className="font-body text-body-md text-white/70 italic leading-relaxed">
            "The most seamless car rental experience I've ever had. Truly curated and premium."
          </p>
          <footer className="flex items-center gap-3 mt-4">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-display font-bold text-white text-sm">
              M
            </div>
            <div>
              <p className="font-body text-sm font-semibold text-white">Marcus Chen</p>
              <p className="font-body text-label-sm text-white/45">Member since 2023</p>
            </div>
          </footer>
        </motion.blockquote>
      </div>
    </div>
  );
}
