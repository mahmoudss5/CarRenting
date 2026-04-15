import { motion } from "framer-motion";
import { UserCircle, Save, CheckCircle, AlertCircle } from "lucide-react";
import PrimaryButton from "../components/ui/PrimaryButton";
import OwnerPageLayout from "./components/OwnerPageLayout";
import useOwnerProfileSettingsForm from "./hooks/useOwnerProfileSettingsForm";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};
const stagger = {
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block font-body text-label-sm uppercase text-on-surface/60 tracking-[0.04em]">{label}</span>
      {children}
    </label>
  );
}

const INPUT_CLASSNAME = [
  "w-full rounded-lg bg-surface-highest px-4 py-3",
  "font-body text-body-md text-on-surface",
  "border border-transparent outline-none transition-all duration-200",
  "focus:bg-surface-low focus:border-primary/30 focus:ring-2 focus:ring-primary/10",
].join(" ");

export default function OwnerProfileSettings() {
  const { formData, statusMessage, statusType, updateField, handleSubmit } = useOwnerProfileSettingsForm();

  return (
    <OwnerPageLayout>
      <motion.div variants={stagger} initial="hidden" animate="show">
        <motion.section
          variants={fadeUp}
          className="relative overflow-hidden rounded-2xl bg-surface-low border border-surface-dim p-6 md:p-8 mb-8"
        >
          <div className="absolute -right-10 top-6 h-40 w-40 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
          <div className="flex items-center gap-2 mb-2">
            <UserCircle size={16} className="text-primary" strokeWidth={1.8} />
            <p className="font-body text-label-sm uppercase text-primary tracking-[0.05em]">Owner Account</p>
          </div>
          <h1 className="mt-1 font-display text-display-sm text-on-surface md:text-display-lg">
            Profile Settings
          </h1>
          <p className="mt-3 max-w-[62ch] font-body text-body-md text-on-surface/65 leading-relaxed">
            Update your account information and password to keep your owner profile secure and current.
          </p>
        </motion.section>

        <motion.form
          variants={fadeUp}
          onSubmit={handleSubmit}
          className="rounded-2xl bg-surface-dim border border-surface-dim p-6 md:p-7"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Username">
              <input className={INPUT_CLASSNAME} value={formData.username} onChange={updateField("username")} required />
            </Field>

            <Field label="Email">
              <input
                type="email"
                className={INPUT_CLASSNAME}
                value={formData.email}
                onChange={updateField("email")}
                required
              />
            </Field>

            <Field label="Current Password">
              <input
                type="password"
                className={INPUT_CLASSNAME}
                value={formData.currentPassword}
                onChange={updateField("currentPassword")}
                required
              />
            </Field>

            <Field label="New Password">
              <input
                type="password"
                className={INPUT_CLASSNAME}
                value={formData.newPassword}
                onChange={updateField("newPassword")}
              />
            </Field>

            <div className="md:col-span-2">
              <Field label="Confirm New Password">
                <input
                  type="password"
                  className={INPUT_CLASSNAME}
                  value={formData.confirmPassword}
                  onChange={updateField("confirmPassword")}
                />
              </Field>
            </div>
          </div>

          <div className="mt-8">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
              <PrimaryButton type="submit" fullWidth={false} className="flex items-center gap-1.5 px-7">
                <Save size={15} strokeWidth={2} />
                Save Settings
              </PrimaryButton>
            </motion.div>
          </div>

          {statusMessage && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={[
                "mt-5 flex items-start gap-2.5 rounded-xl px-4 py-4",
                statusType === "error"
                  ? "bg-red-50 text-red-700"
                  : "bg-secondary-container text-on-secondary",
              ].join(" ")}
            >
              {statusType === "error"
                ? <AlertCircle size={17} className="mt-0.5 flex-shrink-0" strokeWidth={1.8} />
                : <CheckCircle size={17} className="mt-0.5 flex-shrink-0" strokeWidth={1.8} />}
              <p className="font-body text-body-md leading-relaxed">{statusMessage}</p>
            </motion.div>
          )}
        </motion.form>
      </motion.div>
    </OwnerPageLayout>
  );
}
