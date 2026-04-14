const FEATURE_CARDS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <path d="M16 8h4a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-4" />
        <circle cx="9" cy="19" r="2" />
        <circle cx="19" cy="19" r="2" />
      </svg>
    ),
    title: "100+ Premium Vehicles",
    body: "Access everything from electric city cars to vintage collectibles.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Verified Local Owners",
    body: "Every host is vetted for safety and exceptional service quality.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    title: "Full Insurance Coverage",
    body: "Drive with peace of mind. Every trip is fully protected by our partners.",
  },
];

function FeatureCard({ icon, title, body }) {
  return (
    <div className="glass-dark rounded-lg p-4 flex items-start gap-3">
      <div className="flex-shrink-0 text-white/70 mt-0.5">{icon}</div>
      <div>
        <p className="font-display font-bold text-sm text-white">{title}</p>
        <p className="font-body text-body-md text-white/55 mt-0.5 leading-snug">{body}</p>
      </div>
    </div>
  );
}

export default function AuthSidePanel() {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #001f5c 0%, #003d9b 40%, #141b2c 100%)",
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity"
      />

      <div className="relative z-10 flex flex-col justify-between h-full p-10">
        <div>
          <p className="font-body text-label-sm uppercase tracking-[0.05em] text-white/50 mb-2">
            Why DriveShare
          </p>
          <h2 className="font-display text-display-sm text-white font-bold leading-tight">
            The premium<br />
            <span style={{ color: "#7aadff" }}>mobility</span> platform.
          </h2>
        </div>

        <div className="flex flex-col gap-3 my-8">
          {FEATURE_CARDS.map((card) => (
            <FeatureCard key={card.title} {...card} />
          ))}
        </div>

        <blockquote>
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
        </blockquote>
      </div>
    </div>
  );
}
