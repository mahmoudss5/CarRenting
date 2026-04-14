const PALETTE = [
  "bg-[#e3eeff] text-primary",
  "bg-[#e8f5e9] text-[#2e7d32]",
  "bg-[#fce4ec] text-[#c62828]",
  "bg-[#e8eaf6] text-[#3949ab]",
  "bg-[#fff3e0] text-[#e65100]",
  "bg-[#f3e5f5] text-[#6a1b9a]",
];

const SIZE_CLASSES = {
  sm: "w-8 h-8 text-[0.65rem]",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
};

function pickColor(initials) {
  return PALETTE[initials.charCodeAt(0) % PALETTE.length];
}

export default function AvatarInitials({ initials, size = "md" }) {
  return (
    <div
      className={[
        "rounded-full flex items-center justify-center shrink-0",
        "font-display font-bold",
        SIZE_CLASSES[size] ?? SIZE_CLASSES.md,
        pickColor(initials),
      ].join(" ")}
    >
      {initials.slice(0, 2).toUpperCase()}
    </div>
  );
}
