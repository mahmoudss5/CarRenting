import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Car, Flag, ArrowRight } from "lucide-react";

const PILLARS = [
  {
    icon: ShieldCheck,
    label: "Vetted & Verified",
    title: "Every owner is background-checked",
    body: "We manually review each host's identity, insurance, and vehicle history before listing.",
  },
  {
    icon: Car,
    label: "Curated Fleet",
    title: "Only premium vehicles make the cut",
    body: "From electric city cars to luxury sedans — every car meets our quality standard.",
  },
  {
    icon: Flag,
    label: "Full Coverage",
    title: "Insured from key-pickup to drop-off",
    body: "Every trip is fully covered. Drive with complete peace of mind, every time.",
  },
];

function PillarCard({ icon: Icon, label, title, body, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover={{ y: -4, boxShadow: "0 8px 32px rgba(0,61,155,0.10)" }}
      className="bg-surface-lowest rounded-card p-8 shadow-ambient border border-surface-dim cursor-default"
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5">
        <Icon size={24} strokeWidth={1.6} />
      </div>
      <p className="font-body text-label-sm uppercase tracking-[0.05em] text-primary mb-2">{label}</p>
      <h3 className="font-display font-bold text-title-md text-on-surface mb-3 leading-snug">{title}</h3>
      <p className="font-body text-body-md text-on-surface/55 leading-relaxed">{body}</p>
    </motion.div>
  );
}

export default function TrustSection() {
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-60px" });

  return (
    <section className="bg-surface py-20" id="how-it-works">
      <div className="max-w-screen-xl mx-auto px-8 lg:px-16">
        <div className="max-w-xl mb-14">
          <p className="font-body text-label-sm uppercase tracking-[0.05em] text-primary mb-3">
            Why DriveShare
          </p>
          <h2
            className="font-display font-bold text-on-surface"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.015em" }}
          >
            Built on trust,<br />
            <span className="text-on-surface/50">designed for freedom.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {PILLARS.map((p, i) => (
            <PillarCard key={p.label} {...p} index={i} />
          ))}
        </div>

        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 20 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="rounded-card p-10 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ background: "linear-gradient(135deg, #003d9b 0%, #0052cc 100%)" }}
        >
          <div>
            <h3 className="font-display font-bold text-display-sm text-white">Ready to drive?</h3>
            <p className="font-body text-body-md text-white/60 mt-2">
              Create your account in under 2 minutes.
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/signup"
              className="flex items-center gap-2 flex-shrink-0 font-body font-bold text-base text-primary no-underline bg-white px-8 py-3.5 rounded-md hover:shadow-deep transition-all duration-200"
            >
              Get Started Free
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
