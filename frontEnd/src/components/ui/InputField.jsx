import { useState } from "react";

function EyeIcon({ open }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export default function InputField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  autoComplete,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={name}
          className="font-body text-label-sm uppercase tracking-[0.05em] text-on-surface/60"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={name}
          name={name}
          type={resolvedType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className={[
            "w-full px-4 py-3 rounded-md",
            "font-body text-base text-on-surface",
            "bg-surface-highest placeholder:text-on-surface/30",
            "outline-none border-none",
            "transition-all duration-200",
            "focus:bg-surface-low focus:ghost-border",
            error ? "ring-1 ring-red-400" : "",
          ].join(" ")}
        />
        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface/40 hover:text-on-surface/70 transition-colors"
          >
            <EyeIcon open={showPassword} />
          </button>
        )}
      </div>
      {error && (
        <span className="font-body text-body-md text-red-500">{error}</span>
      )}
    </div>
  );
}
