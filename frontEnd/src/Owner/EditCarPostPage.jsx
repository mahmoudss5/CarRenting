import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  ArrowLeft,
  Save,
  CheckCircle,
  FileText,
  Settings2,
  MapPin,
  DollarSign,
  AlertCircle,
  RefreshCw,
  Info,
  Lock,
} from "lucide-react";
import PrimaryButton from "../components/ui/PrimaryButton";
import OwnerPageLayout from "./components/OwnerPageLayout";
import useEditCarPostForm from "./hooks/useEditCarPostForm";

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } } };

// ─── Shared input class ───────────────────────────────────────────────────────

const inputCls =
  "w-full rounded-xl bg-white border border-slate-200 px-4 py-3 font-inter text-[0.875rem] text-slate-800 outline-none placeholder:text-slate-400 transition-all duration-200 hover:border-blue-300 hover:shadow-sm focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 focus:shadow-md disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed";

const readonlyCls =
  "w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 font-inter text-[0.875rem] text-slate-500 cursor-not-allowed select-none";

// ─── Field wrapper ────────────────────────────────────────────────────────────

function Field({ label, icon: Icon, children, locked = false }) {
  return (
    <div>
      <label className="block">
        <span className="mb-1.5 flex items-center gap-1.5 font-inter text-[0.7rem] font-semibold uppercase tracking-widest text-slate-500">
          {Icon && <Icon size={11} className={locked ? "text-slate-400" : "text-blue-500"} strokeWidth={2.2} />}
          {label}
          {locked && (
            <span className="flex items-center gap-0.5 text-slate-400">
              <Lock size={9} strokeWidth={2.5} />
              <span className="text-[0.6rem]">read-only</span>
            </span>
          )}
        </span>
        {children}
      </label>
    </div>
  );
}

// ─── Section card ─────────────────────────────────────────────────────────────

function SectionCard({ icon: Icon, title, subtitle, children }) {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl border border-slate-200/80 bg-white shadow-[0_2px_16px_rgba(15,23,42,0.06)] hover:shadow-[0_6px_28px_rgba(15,23,42,0.09)] transition-shadow duration-300"
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EditCarPostPage() {
  const { postId } = useParams();
  const {
    originalCar,
    formData,
    isLoading,
    loadError,
    isSubmitting,
    isSubmitted,
    serverError,
    updateField,
    handleSubmit,
  } = useEditCarPostForm(postId);

  // ── Loading state ──
  if (isLoading) {
    return (
      <OwnerPageLayout>
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="h-8 w-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
          <p className="font-inter text-[0.875rem] text-slate-500">Loading car details…</p>
        </div>
      </OwnerPageLayout>
    );
  }

  // ── Load error state ──
  if (loadError) {
    return (
      <OwnerPageLayout>
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <AlertCircle size={40} className="text-red-400" strokeWidth={1.5} />
          <p className="font-inter text-[0.9rem] text-red-600">{loadError}</p>
          <Link
            to="/owner/home"
            className="flex items-center gap-1.5 font-inter text-[0.875rem] text-blue-600 hover:underline no-underline"
          >
            <ArrowLeft size={14} strokeWidth={2} /> Back to listings
          </Link>
        </div>
      </OwnerPageLayout>
    );
  }

  return (
    <OwnerPageLayout>
      <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-4xl mx-auto">

        {/* ── Hero header ── */}
        <motion.div variants={fadeUp} className="mb-8">
          <Link
            to="/owner/home"
            className="inline-flex items-center gap-1.5 mb-4 font-inter text-[0.8rem] text-slate-500 hover:text-slate-800 no-underline transition-colors"
          >
            <ArrowLeft size={13} strokeWidth={2.5} />
            Back to My Listings
          </Link>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600">
              <Car size={12} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-inter text-[0.7rem] font-bold uppercase tracking-widest text-blue-600">
              Owner Publishing
            </span>
          </div>
          <h1 className="font-display font-extrabold text-[2rem] leading-tight tracking-tight text-slate-900 md:text-[2.5rem]">
            Edit Car Listing
          </h1>
          <p className="mt-2 max-w-[55ch] font-inter text-[0.9rem] text-slate-500 leading-relaxed">
            You can update the title, description, price, location, and transmission.
            Brand, model, year, and car type cannot be changed after creation.
          </p>
        </motion.div>

        {/* ── Read-only info notice ── */}
        <motion.div
          variants={fadeUp}
          className="mb-6 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4"
        >
          <Info size={16} className="text-blue-500 mt-0.5 shrink-0" strokeWidth={2} />
          <div>
            <p className="font-inter text-[0.85rem] font-semibold text-blue-800">
              Editing: <span className="font-bold">{originalCar?.title}</span>
            </p>
            <p className="font-inter text-[0.78rem] text-blue-600 mt-0.5">
              {originalCar?.brand} {originalCar?.model} · {originalCar?.year} · {originalCar?.car_type}
            </p>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* ── Section 1: Listing Info ── */}
          <SectionCard icon={FileText} title="Listing Info" subtitle="Update your listing's public title and description">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Listing Title" icon={FileText}>
                <input
                  value={formData.title}
                  onChange={updateField("title")}
                  placeholder="e.g. 2023 BMW 5 Series"
                  className={inputCls}
                  disabled={isSubmitting}
                />
              </Field>

              <Field label="Description" icon={FileText}>
                <textarea
                  value={formData.description}
                  onChange={updateField("description")}
                  placeholder="Describe your car — features, condition, extras…"
                  className={`${inputCls} min-h-[100px] resize-y leading-relaxed`}
                  rows={4}
                  disabled={isSubmitting}
                />
              </Field>
            </div>
          </SectionCard>

          {/* ── Section 2: Vehicle Details (read-only) ── */}
          <SectionCard icon={Car} title="Vehicle Details" subtitle="These fields are locked after creation">
            <div className="grid gap-4 md:grid-cols-3">
              <Field label="Brand" locked>
                <div className={readonlyCls}>{originalCar?.brand ?? "—"}</div>
              </Field>
              <Field label="Model" locked>
                <div className={readonlyCls}>{originalCar?.model ?? "—"}</div>
              </Field>
              <Field label="Year" locked>
                <div className={readonlyCls}>{originalCar?.year ?? "—"}</div>
              </Field>
              <Field label="Car Type" locked>
                <div className={readonlyCls}>{originalCar?.car_type ?? "—"}</div>
              </Field>
              <Field label="Transmission" icon={Settings2}>
                <div className="relative">
                  <select
                    value={formData.transmission}
                    onChange={updateField("transmission")}
                    className={`${inputCls} appearance-none cursor-pointer pr-9`}
                    disabled={isSubmitting}
                  >
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                  <svg
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </Field>
              <Field label="Location" icon={MapPin}>
                <input
                  value={formData.location}
                  onChange={updateField("location")}
                  placeholder="e.g. Algiers, Oran"
                  className={inputCls}
                  disabled={isSubmitting}
                />
              </Field>
            </div>
          </SectionCard>

          {/* ── Section 3: Pricing ── */}
          <SectionCard icon={DollarSign} title="Pricing" subtitle="Update your daily rental rate">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Rental Price (Per Day)" icon={DollarSign}>
                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-inter text-[0.875rem] font-semibold text-slate-400">
                    $
                  </span>
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    value={formData.rentalPrice}
                    onChange={updateField("rentalPrice")}
                    placeholder="0.00"
                    className={`${inputCls} pl-8`}
                    disabled={isSubmitting}
                  />
                </div>
              </Field>
            </div>
          </SectionCard>

          {/* ── Actions ── */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 pb-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <PrimaryButton
                type="submit"
                fullWidth={false}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-3 text-[0.875rem]"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" strokeWidth={2} />
                    Saving…
                  </>
                ) : (
                  <>
                    <Save size={14} strokeWidth={2} />
                    Save Changes
                  </>
                )}
              </PrimaryButton>
            </motion.div>

            <Link
              to="/owner/home"
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 py-3 font-inter text-[0.875rem] font-medium text-slate-700 no-underline shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md hover:text-slate-900"
            >
              <ArrowLeft size={14} strokeWidth={2} />
              Cancel
            </Link>
          </motion.div>

          {/* ── Success banner ── */}
          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4"
              >
                <CheckCircle size={17} className="mt-0.5 flex-shrink-0 text-emerald-600" strokeWidth={2} />
                <div>
                  <p className="font-inter text-[0.875rem] font-semibold text-emerald-800">
                    Listing updated successfully!
                  </p>
                  <p className="font-inter text-[0.8rem] text-emerald-700 leading-relaxed mt-0.5">
                    Your changes have been saved. Redirecting to your listings…
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Error banner ── */}
          <AnimatePresence>
            {serverError && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4"
              >
                <AlertCircle size={17} className="mt-0.5 flex-shrink-0 text-red-600" strokeWidth={2} />
                <p className="font-inter text-[0.875rem] text-red-700">{serverError}</p>
              </motion.div>
            )}
          </AnimatePresence>

        </form>
      </motion.div>
    </OwnerPageLayout>
  );
}
