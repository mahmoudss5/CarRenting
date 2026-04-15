import { useState } from 'react';

/**
 * Editorial input field — filled style, no underline.
 * Active state transitions background and adds a ghost primary border (20% opacity).
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
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-label-sm font-bold tracking-[0.05em] uppercase text-on-surface/50"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface/40 pointer-events-none">
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
            'w-full rounded-md py-3 text-body-md font-inter text-on-surface outline-none',
            'transition-all duration-200 placeholder:text-on-surface/35',
            icon ? 'pl-10 pr-4' : 'px-4',
            focused
              ? 'bg-[#eef0ff] ring-1 ring-primary/20'
              : 'bg-surface-container-highest',
          ].join(' ')}
        />
      </div>
    </div>
  );
}
