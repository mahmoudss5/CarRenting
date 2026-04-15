import { Link } from 'react-router-dom';

/**
 * Auth card shell — handles layout and footer link.
 * Children slot receives form fields and submit button.
 */
export default function AuthCard({
  title,
  subtitle,
  children,
  footerText,
  footerLinkLabel,
  footerLinkTo,
}) {
  return (
    <div
      className="w-full max-w-md rounded-2xl p-10 bg-surface"
      style={{ boxShadow: '0 10px 40px -10px rgba(20, 27, 44, 0.08)' }}
    >
      <h1 className="font-manrope font-bold text-on-surface mb-2" style={{ fontSize: '1.75rem' }}>
        {title}
      </h1>
      <p className="font-inter text-body-md text-on-surface/50 mb-8">{subtitle}</p>

      {children}

      {footerText && (
        <p className="text-center mt-6 font-inter text-body-md text-on-surface/50">
          {footerText}{' '}
          <Link
            to={footerLinkTo}
            className="text-primary font-semibold hover:underline"
          >
            {footerLinkLabel}
          </Link>
        </p>
      )}
    </div>
  );
}
