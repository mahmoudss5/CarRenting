import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

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
            "outline-none border border-transparent",
            "transition-all duration-200",
            "focus:bg-surface-low focus:border-primary/30 focus:ring-2 focus:ring-primary/10",
            error ? "border-red-400 ring-1 ring-red-200" : "",
          ].join(" ")}
        />
        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface/40 hover:text-on-surface/70 transition-colors"
          >
            {showPassword ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
          </button>
        )}
      </div>
      {error && (
        <span className="font-body text-body-md text-red-500 flex items-center gap-1">
          {error}
        </span>
      )}
    </div>
  );
}
