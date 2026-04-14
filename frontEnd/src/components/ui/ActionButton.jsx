const VARIANTS = {
  approve: [
    "bg-primary-gradient text-on-primary",
    "hover:scale-[1.02] hover:shadow-ambient",
  ],
  reject: [
    "bg-surface-bright text-[#e53935]",
    "outline outline-1 outline-[rgba(229,57,53,0.25)]",
    "hover:bg-[rgba(229,57,53,0.04)]",
  ],
  review: [
    "bg-surface-bright text-on-surface/70",
    "outline outline-1 outline-[rgba(99,102,120,0.15)]",
    "hover:bg-surface-low",
  ],
};

export default function ActionButton({
  label,
  variant = "approve",
  onClick,
  disabled = false,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        "px-4 py-1.5 rounded-md",
        "font-body font-semibold text-body-md",
        "transition-all duration-150 cursor-pointer",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100",
        ...(VARIANTS[variant] ?? VARIANTS.approve),
      ].join(" ")}
    >
      {label}
    </button>
  );
}
