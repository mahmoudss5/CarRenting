import { Link } from "react-router-dom";

const PILLARS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    label: "Vetted & Verified",
    title: "Every owner is background-checked",
    body: "We manually review each host's identity, insurance, and vehicle history before listing.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <path d="M16 8h4a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-4" />
        <circle cx="9" cy="19" r="2" />
        <circle cx="19" cy="19" r="2" />
      </svg>
    ),
    label: "Curated Fleet",
    title: "Only premium vehicles make the cut",
    body: "From electric city cars to luxury sedans — every car meets our quality standard.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" />
      </svg>
    ),
    label: "Full Coverage",
    title: "Insured from key-pickup to drop-off",
    body: "Every trip is fully covered. Drive with complete peace of mind, every time.",
  },
];

function PillarCard({ icon, label, title, body }) {
  return (
    <div className="bg-surface-lowest rounded-card p-8 shadow-ambient">
      <div className="text-primary mb-5">{icon}</div>
      <p className="font-body text-label-sm uppercase tracking-[0.05em] text-primary mb-2">{label}</p>
      <h3 className="font-display font-bold text-title-md text-on-surface mb-3 leading-snug">{title}</h3>
      <p className="font-body text-body-md text-on-surface/55 leading-relaxed">{body}</p>
    </div>
  );
}

export default function TrustSection() {
  return (
    <section className="bg-surface py-20" id="how-it-works">
      <div className="max-w-screen-xl mx-auto px-8 lg:px-16">
        <div className="max-w-xl mb-14">
          <p className="font-body text-label-sm uppercase tracking-[0.05em] text-primary mb-3">
            Why DriveShare
          </p>
          <h2 className="font-display font-bold text-on-surface" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.015em" }}>
            Built on trust,<br />
            <span className="text-on-surface/50">designed for freedom.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {PILLARS.map((p) => (
            <PillarCard key={p.label} {...p} />
          ))}
        </div>

        <div className="bg-primary rounded-card p-10 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ background: "linear-gradient(135deg, #003d9b 0%, #0052cc 100%)" }}>
          <div>
            <h3 className="font-display font-bold text-display-sm text-white">Ready to drive?</h3>
            <p className="font-body text-body-md text-white/60 mt-2">
              Create your account in under 2 minutes.
            </p>
          </div>
          <Link
            to="/signup"
            className="flex-shrink-0 font-body font-bold text-base text-on-surface no-underline bg-white px-8 py-3.5 rounded-md hover:shadow-deep transition-all duration-200 hover:scale-[1.02]"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </section>
  );
}
