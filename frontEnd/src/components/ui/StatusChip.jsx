const VARIANTS = {
  verified: "bg-secondary-container text-on-secondary",
  pending:  "bg-tertiary-fixed text-tertiary",
  featured: "bg-primary/10 text-primary",
};

export default function StatusChip({ label, variant = "verified" }) {
  return (
    <span
      className={[
        "inline-block px-3 py-1 rounded-full",
        "font-body text-label-sm uppercase tracking-[0.05em]",
        VARIANTS[variant] ?? VARIANTS.verified,
      ].join(" ")}
    >
      {label}
    </span>
  );
}
