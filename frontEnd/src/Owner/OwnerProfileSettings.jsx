import { motion } from "framer-motion";
import {
  UserCircle,
  Save,
  CheckCircle,
  AlertCircle,
  Mail,
  User,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import PrimaryButton from "../components/ui/PrimaryButton";
import OwnerPageLayout from "./components/OwnerPageLayout";
import useOwnerProfileSettingsForm from "./hooks/useOwnerProfileSettingsForm";

/* ─── Animation presets ─────────────────────────────────────── */
const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };
const stagger = {
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

/* ─── Shared input class ─────────────────────────────────────── */
const input =
  "w-full rounded-xl bg-white border border-slate-200 px-4 py-3 font-inter text-[0.875rem] text-slate-800 outline-none placeholder:text-slate-400 transition-all duration-200 hover:border-blue-300 hover:shadow-sm focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 focus:shadow-md";

/* ─── Field wrapper ──────────────────────────────────────────── */
function Field({ label, icon: Icon, children, span2 = false }) {
  return (
    <div className={span2 ? "md:col-span-2" : ""}>
      <label className="block">
        <span className="mb-1.5 flex items-center gap-1.5 font-inter text-[0.7rem] font-semibold uppercase tracking-widest text-slate-500">
          {Icon && <Icon size={11} className="text-blue-500" strokeWidth={2.2} />}
          {label}
        </span>
        {children}
      </label>
    </div>
  );
}

/* ─── Section card ───────────────────────────────────────────── */
function SectionCard({ icon: Icon, title, subtitle, children }) {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl border border-slate-200/80 bg-white shadow-[0_2px_16px_rgba(15,23,42,0.06)] hover:shadow-[0_8px_32px_rgba(15,23,42,0.10)] transition-shadow duration-300"
    >
      <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 ring-1 ring-blue-100">
          <Icon size={16} className="text-blue-600" strokeWidth={2} />
        </div>
        <div>
          <p className="font-inter text-[0.875rem] font-semibold text-slate-800">{title}</p>
          {subtitle && (
            <p className="font-inter text-[0.75rem] text-slate-500 leading-tight">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="px-6 py-6">{children}</div>
    </motion.div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function OwnerProfileSettings() {
  const { formData, statusMessage, statusType, updateField, handleSubmit } =
    useOwnerProfileSettingsForm();

  return (
    <OwnerPageLayout>
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="max-w-3xl mx-auto"
      >
        {/* ── Hero header ── */}
        <motion.div variants={fadeUp} className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600">
              <UserCircle size={12} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-inter text-[0.7rem] font-bold uppercase tracking-widest text-blue-600">
              Owner Account
            </span>
          </div>
          <h1 className="font-display font-extrabold text-[2rem] leading-tight tracking-tight text-slate-900 md:text-[2.5rem]">
            Profile Settings
          </h1>
          <p className="mt-2 max-w-[55ch] font-inter text-[0.9rem] text-slate-500 leading-relaxed">
            Update your account credentials to keep your owner profile secure and current.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* ── Section 1: Account Details ── */}
          <SectionCard icon={User} title="Account Details" subtitle="Your username and primary email">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Username" icon={User}>
                <input
                  className={input}
                  value={formData.username}
                  onChange={updateField("username")}
                  placeholder="your_username"
                  required
                />
              </Field>
              <Field label="Email Address" icon={Mail}>
                <input
                  type="email"
                  className={input}
                  value={formData.email}
                  onChange={updateField("email")}
                  placeholder="you@example.com"
                  required
                />
              </Field>
            </div>
          </SectionCard>

          {/* ── Section 2: Password ── */}
          <SectionCard icon={ShieldCheck} title="Security" subtitle="Update your password regularly to stay protected">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Current Password" icon={KeyRound} span2>
                <input
                  type="password"
                  className={input}
                  value={formData.currentPassword}
                  onChange={updateField("currentPassword")}
                  placeholder="Enter current password"
                  required
                />
              </Field>
              <Field label="New Password" icon={KeyRound}>
                <input
                  type="password"
                  className={input}
                  value={formData.newPassword}
                  onChange={updateField("newPassword")}
                  placeholder="New password"
                />
              </Field>
              <Field label="Confirm New Password" icon={KeyRound}>
                <input
                  type="password"
                  className={input}
                  value={formData.confirmPassword}
                  onChange={updateField("confirmPassword")}
                  placeholder="Repeat new password"
                />
              </Field>
            </div>
          </SectionCard>

          {/* ── Action row ── */}
          <motion.div variants={fadeUp} className="pb-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block"
            >
              <PrimaryButton
                type="submit"
                fullWidth={false}
                className="flex items-center gap-2 px-6 py-3 text-[0.875rem]"
              >
                <Save size={14} strokeWidth={2} />
                Save Settings
              </PrimaryButton>
            </motion.div>
          </motion.div>

          {/* Status banner */}
          {statusMessage && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={[
                "flex items-start gap-3 rounded-2xl border px-5 py-4",
                statusType === "error"
                  ? "border-red-200 bg-red-50"
                  : "border-emerald-200 bg-emerald-50",
              ].join(" ")}
            >
              {statusType === "error" ? (
                <AlertCircle size={17} className="mt-0.5 flex-shrink-0 text-red-600" strokeWidth={2} />
              ) : (
                <CheckCircle size={17} className="mt-0.5 flex-shrink-0 text-emerald-600" strokeWidth={2} />
              )}
              <p
                className={[
                  "font-inter text-[0.875rem] leading-relaxed",
                  statusType === "error" ? "text-red-700" : "text-emerald-700",
                ].join(" ")}
              >
                {statusMessage}
              </p>
            </motion.div>
          )}
        </form>
      </motion.div>
    </OwnerPageLayout>
  );
}
