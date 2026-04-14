export default function SectionCard({ children, className = "" }) {
  return (
    <div
      className={[
        "bg-surface-bright rounded-lg shadow-ambient overflow-hidden",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
