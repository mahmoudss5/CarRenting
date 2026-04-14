import PrimaryButton from "../components/ui/PrimaryButton";
import OwnerPageLayout from "./components/OwnerPageLayout";
import useOwnerProfileSettingsForm from "./hooks/useOwnerProfileSettingsForm";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block font-body text-label-sm uppercase text-on-surface/65">{label}</span>
      {children}
    </label>
  );
}

const INPUT_CLASSNAME = [
  "w-full rounded-md bg-surface-highest px-4 py-3",
  "font-body text-body-md text-on-surface",
  "border-0 outline-none transition-colors",
  "focus:bg-primary/10 focus:ghost-border",
].join(" ");

export default function OwnerProfileSettings() {
  const { formData, statusMessage, statusType, updateField, handleSubmit } = useOwnerProfileSettingsForm();

  return (
    <OwnerPageLayout>
      <section className="rounded-card bg-surface-low p-6 md:p-8">
        <p className="font-body text-label-sm uppercase text-primary">Owner Account</p>
        <h1 className="mt-2 font-display text-display-sm text-on-surface md:text-display-lg">Profile Settings</h1>
        <p className="mt-3 max-w-[62ch] font-body text-body-md text-on-surface/80">
          Update your basic account information and password to keep your owner profile secure and current.
        </p>
      </section>

      <form onSubmit={handleSubmit} className="mt-8 rounded-card bg-surface-dim p-6 md:p-7">
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
          <PrimaryButton type="submit" fullWidth={false} className="px-7">
            Save Settings
          </PrimaryButton>
        </div>

        {statusMessage ? (
          <p
            className={[
              "mt-5 rounded-md px-4 py-3 font-body text-body-md",
              statusType === "error" ? "bg-tertiary-fixed text-tertiary" : "bg-secondary-container text-on-secondary",
            ].join(" ")}
          >
            {statusMessage}
          </p>
        ) : null}
      </form>
    </OwnerPageLayout>
  );
}
