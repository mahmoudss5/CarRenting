export default function PrimaryButton({
  children,
  type = "button",
  onClick,
  disabled = false,
  fullWidth = true,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        "relative py-3.5 px-8 rounded-md",
        "font-display font-bold text-base text-on-primary",
        "bg-primary-gradient",
        "transition-all duration-200 ease-out",
        "hover:scale-[1.02] hover:shadow-deep",
        "active:scale-[0.99]",
        "disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100",
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}
