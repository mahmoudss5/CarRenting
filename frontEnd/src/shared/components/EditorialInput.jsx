import { useState } from 'react';

/**
 * Premium editorial input — bordered white style with smooth focus states.
 * Active state transitions border to blue with a soft ring.
 */
export default function EditorialInput({
  id,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  icon,
  label,
  className = '',
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="font-inter text-[0.7rem] font-semibold uppercase tracking-widest text-slate-500"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}

        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={[
            'w-full rounded-xl border py-3 font-inter text-[0.875rem] text-slate-800 outline-none transition-all duration-200',
            'placeholder:text-slate-400',
            icon ? 'pl-10 pr-4' : 'px-4',
            focused
              ? 'border-blue-500 bg-white ring-3 ring-blue-500/10 shadow-md'
              : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm',
          ].join(' ')}
        />
      </div>
    </div>
  );
}
