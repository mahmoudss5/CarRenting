import { Link } from "react-router-dom";
import InputField from "../../components/ui/InputField";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { useSignupForm } from "../hooks/useSignupForm";

// ─── Role picker ──────────────────────────────────────────────────────────────

function CarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 11l1.5-4.5a2 2 0 0 1 1.9-1.5h7.2a2 2 0 0 1 1.9 1.5L19 11" />
      <rect x="3" y="11" width="18" height="7" rx="1.5" />
      <circle cx="7.5" cy="18" r="1.5" /><circle cx="16.5" cy="18" r="1.5" />
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="M21 2l-9.6 9.6" /><path d="M15.5 7.5l3 3" /><path d="M18 5l2 2" />
    </svg>
  );
}

const ROLES = [
  {
    value: "Renter",
    icon: KeyIcon,
    title: "Renter",
    description: "Rent vehicles for any trip. Instant access, no approval needed.",
  },
  {
    value: "CarOwner",
    icon: CarIcon,
    title: "Car Owner",
    description: "List your car and earn. Your profile is reviewed by our team.",
  },
];

function RoleCard({ role, selected, onSelect }) {
  const Icon = role.icon;
  return (
    <button
      type="button"
      onClick={() => onSelect(role.value)}
      className={[
        "flex-1 text-left p-4 rounded-lg border-0 outline outline-1 cursor-pointer transition-all duration-150",
        selected
          ? "bg-[rgba(0,61,155,0.05)] outline-2 outline-primary shadow-[0_0_0_3px_rgba(0,61,155,0.08)]"
          : "bg-surface-lowest outline-[rgba(99,102,120,0.18)] hover:bg-surface-low",
      ].join(" ")}
    >
      <div
        className={[
          "w-9 h-9 rounded-full flex items-center justify-center mb-2.5",
          selected ? "bg-primary text-on-primary" : "bg-surface-high text-on-surface/50",
        ].join(" ")}
      >
        <Icon />
      </div>
      <p
        className={[
          "font-display font-semibold text-body-md",
          selected ? "text-primary" : "text-on-surface",
        ].join(" ")}
      >
        {role.title}
      </p>
      <p className="font-body text-label-sm text-on-surface/50 mt-0.5 leading-snug">
        {role.description}
      </p>
    </button>
  );
}

// ─── Success screens ──────────────────────────────────────────────────────────

function CheckCircleIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function RenterSuccess() {
  return (
    <div className="flex flex-col items-center text-center py-6">
      <div className="text-emerald-500 mb-5">
        <CheckCircleIcon />
      </div>
      <p className="font-body text-label-sm uppercase tracking-[0.05em] text-emerald-500 mb-2">
        You're all set
      </p>
      <h2
        className="font-display font-bold text-on-surface mb-3"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.015em" }}
      >
        Account Ready!
      </h2>
      <p className="font-body text-body-md text-on-surface/55 max-w-xs mb-8 leading-relaxed">
        Your renter account has been created. You can sign in right now and start
        exploring vehicles.
      </p>
      <Link
        to="/login"
        className="w-full flex items-center justify-center py-3.5 px-8 rounded-md bg-primary-gradient text-on-primary font-display font-bold text-base transition-all duration-200 hover:scale-[1.02] hover:shadow-deep no-underline"
      >
        Sign In Now
      </Link>
    </div>
  );
}

function OwnerSuccess() {
  return (
    <div className="flex flex-col items-center text-center py-6">
      <div className="text-primary mb-5">
        <ClockIcon />
      </div>
      <p className="font-body text-label-sm uppercase tracking-[0.05em] text-primary mb-2">
        Application submitted
      </p>
      <h2
        className="font-display font-bold text-on-surface mb-3"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.015em" }}
      >
        Under Review
      </h2>
      <p className="font-body text-body-md text-on-surface/55 max-w-xs mb-6 leading-relaxed">
        Our team will review your Car Owner application within 24 hours.
        You'll receive an email once a decision has been made.
      </p>
      <div className="w-full bg-surface-low rounded-lg px-5 py-4 mb-8 text-left">
        {[
          "Identity documents reviewed",
          "Account activated by admin",
          "Email notification sent to you",
        ].map((step, i) => (
          <div key={i} className="flex items-center gap-3 py-1.5">
            <div className="w-5 h-5 rounded-full bg-surface-high flex items-center justify-center shrink-0">
              <span className="font-body text-label-sm text-on-surface/40">{i + 1}</span>
            </div>
            <span className="font-body text-body-md text-on-surface/60">{step}</span>
          </div>
        ))}
      </div>
      <Link
        to="/login"
        className="w-full flex items-center justify-center py-3.5 px-8 rounded-md bg-primary-gradient text-on-primary font-display font-bold text-base transition-all duration-200 hover:scale-[1.02] hover:shadow-deep no-underline"
      >
        Return to Sign In
      </Link>
    </div>
  );
}

// ─── Main form ────────────────────────────────────────────────────────────────

function OAuthDivider() {
  return (
    <div className="flex items-center gap-4 my-5">
      <div className="flex-1 h-px bg-surface-highest" />
      <span className="font-body text-label-sm uppercase tracking-[0.05em] text-on-surface/35">
        or sign up with
      </span>
      <div className="flex-1 h-px bg-surface-highest" />
    </div>
  );
}

function OAuthButton({ provider, icon }) {
  return (
    <button
      type="button"
      className="flex-1 flex items-center justify-center gap-2.5 py-3 rounded-md bg-surface-highest font-body text-sm font-medium text-on-surface/70 hover:bg-surface-high transition-colors"
    >
      {icon}
      {provider}
    </button>
  );
}

export default function SignupForm() {
  const {
    values,
    errors,
    isLoading,
    serverError,
    successData,
    handleChange,
    setRole,
    handleSubmit,
  } = useSignupForm();

  if (successData?.role === "Renter") return <RenterSuccess />;
  if (successData?.role === "CarOwner") return <OwnerSuccess />;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col">
      <p className="font-body text-label-sm uppercase tracking-[0.05em] text-primary mb-3">
        Get Started
      </p>
      <h1
        className="font-display font-bold text-on-surface mb-1"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.015em" }}
      >
        Join DriveShare —<br />
        <span className="text-on-surface/50">Choose your role.</span>
      </h1>
      <p className="font-body text-body-md text-on-surface/50 mb-6">
        Already a member?{" "}
        <Link
          to="/login"
          className="text-primary font-semibold no-underline hover:underline underline-offset-2"
        >
          Sign in
        </Link>
      </p>

      {/* Role picker */}
      <div className="mb-5">
        <p className="font-body text-label-sm uppercase tracking-[0.05em] text-on-surface/60 mb-2.5">
          I want to…
        </p>
        <div className="flex gap-3">
          {ROLES.map((r) => (
            <RoleCard
              key={r.value}
              role={r}
              selected={values.role === r.value}
              onSelect={setRole}
            />
          ))}
        </div>
        {errors.role && (
          <p className="font-body text-body-md text-red-500 mt-1.5">{errors.role}</p>
        )}
      </div>

      {serverError && (
        <div className="bg-red-50 text-red-600 rounded-md px-4 py-3 font-body text-body-md mb-4">
          {serverError}
        </div>
      )}

      <div className="flex flex-col gap-4">
        <InputField
          label="Full Name"
          name="fullName"
          placeholder="Enter your legal name"
          value={values.fullName}
          onChange={handleChange}
          error={errors.fullName}
          autoComplete="name"
        />
        <InputField
          label="Email Address"
          name="email"
          type="email"
          placeholder="name@example.com"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          autoComplete="email"
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          placeholder="Create a secure password (8+ chars)"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="new-password"
        />

        {/* Context-aware info box */}
        {values.role === "CarOwner" && (
          <div className="bg-[rgba(0,61,155,0.05)] rounded-md px-4 py-3 flex items-start gap-2.5">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary flex-shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="font-body text-body-md text-on-surface/60 leading-snug">
              Car Owner accounts require admin review. Your account will be activated within 24 hours.
            </p>
          </div>
        )}
        {values.role === "Renter" && (
          <div className="bg-[rgba(46,125,50,0.05)] rounded-md px-4 py-3 flex items-start gap-2.5">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-600 flex-shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10" /><polyline points="9 12 11 14 15 10" />
            </svg>
            <p className="font-body text-body-md text-on-surface/60 leading-snug">
              Renter accounts are activated instantly. You can start exploring vehicles right after signing up.
            </p>
          </div>
        )}

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="agreedToTerms"
            checked={values.agreedToTerms}
            onChange={handleChange}
            className="mt-0.5 accent-primary w-4 h-4 flex-shrink-0"
          />
          <span className="font-body text-body-md text-on-surface/60 leading-snug">
            I agree to the{" "}
            <Link to="/terms" className="text-primary font-semibold no-underline hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-primary font-semibold no-underline hover:underline">
              Privacy Policy
            </Link>
          </span>
        </label>
        {errors.agreedToTerms && (
          <span className="font-body text-body-md text-red-500 -mt-2">
            {errors.agreedToTerms}
          </span>
        )}
      </div>

      <div className="mt-6">
        <PrimaryButton type="submit" disabled={isLoading}>
          {isLoading ? "Creating account…" : "Create My Account"}
        </PrimaryButton>
      </div>

      <OAuthDivider />

      <div className="flex gap-3">
        <OAuthButton
          provider="Google"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
          }
        />
        <OAuthButton
          provider="Apple"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
          }
        />
      </div>
    </form>
  );
}
