import { Link } from 'react-router-dom';
import { GRADIENT_PRIMARY, SHADOW_BUTTON, SHADOW_BUTTON_HOVER } from '../../design/tokens';

/**
 * Primary CTA button — gradient fill, 2px scale expand on hover.
 * Accepts either a `to` prop (renders as React Router Link)
 * or an `onClick` prop (renders as <button>).
 */
export default function PrimaryButton({
  children,
  to,
  onClick,
  type = 'button',
  size = 'md',
  className = '',
  style = {},
}) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-[0.9375rem]',
    lg: 'px-8 py-4 text-base',
  };

  const baseClasses = [
    'inline-flex items-center justify-center gap-2',
    'font-semibold text-white rounded-md',
    'cursor-pointer transition-all duration-200',
    'hover:scale-[1.02]',
    sizeClasses[size] || sizeClasses.md,
    className,
  ].join(' ');

  const baseStyle = {
    background: GRADIENT_PRIMARY,
    boxShadow: SHADOW_BUTTON,
    ...style,
  };

  const hoverHandlers = {
    onMouseEnter: (e) => (e.currentTarget.style.boxShadow = SHADOW_BUTTON_HOVER),
    onMouseLeave: (e) => (e.currentTarget.style.boxShadow = SHADOW_BUTTON),
  };

  if (to) {
    return (
      <Link to={to} className={baseClasses} style={baseStyle} {...hoverHandlers}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={baseClasses}
      style={baseStyle}
      {...hoverHandlers}
    >
      {children}
    </button>
  );
}
