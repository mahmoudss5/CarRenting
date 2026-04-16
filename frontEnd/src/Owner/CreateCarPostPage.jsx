import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Car,
  ArrowLeft,
  Send,
  CheckCircle,
  User,
  FileText,
  Tag,
  Cpu,
  Settings2,
  MapPin,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import PrimaryButton from "../components/ui/PrimaryButton";
import OwnerPageLayout from "./components/OwnerPageLayout";
import useCreateCarPostForm from "./hooks/useCreateCarPostForm";
import { getUser } from "../lib/auth";

const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };
const stagger = {
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

const input =
  "w-full rounded-xl bg-white border border-slate-200 px-4 py-3 font-inter text-[0.875rem] text-slate-800 outline-none placeholder:text-slate-400 transition-all duration-200 hover:border-blue-300 hover:shadow-sm focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 focus:shadow-md";

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

function SectionCard({ icon: Icon, title, subtitle, children, delay = 0 }) {
  return (
    <motion.div
      variants={fadeUp}
      transition={{ delay }}
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

export default function CreateCarPostPage() {
  const { formData, isSubmitted, isSubmitting, serverError, updateField, handleSubmit } =
    useCreateCarPostForm();

  const user = getUser();

  return (
    <OwnerPageLayout>
      <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-4xl mx-auto">

        {/* Hero header */}
        <motion.div variants={fadeUp} className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600">
              <Car size={12} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-inter text-[0.7rem] font-bold uppercase tracking-widest text-blue-600">
              Owner Publishing
            </span>
          </div>
          <h1 className="font-display font-extrabold text-[2rem] leading-tight tracking-tight text-slate-900 md:text-[2.5rem]">
            Create New Car Listing
          </h1>
          <p className="mt-2 max-w-[55ch] font-inter text-[0.9rem] text-slate-500 leading-relaxed">
            Fill in your vehicle details below. Your submission will be reviewed by our admin team before going live.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Section 1: Listing Info */}
          <SectionCard icon={User} title="Listing Info" subtitle="Identify this listing">
            <div className="grid gap-4 md:grid-cols-2">

              {/* Owner display — read-only, derived from auth token */}
              <div className="md:col-span-2 flex items-center gap-2 rounded-xl bg-slate-50 border border-slate-200 px-4 py-3">
                <User size={14} className="text-blue-500 shrink-0" strokeWidth={2} />
                <span className="font-inter text-[0.75rem] font-semibold uppercase tracking-widest text-slate-400 mr-2">
                  Owner
                </span>
                <span className="font-inter text-[0.875rem] font-medium text-slate-700">
                  {user?.full_name ?? "—"}
                </span>
              </div>

              <Field label="Listing Title" icon={FileText}>
                <input
                  value={formData.title}
                  onChange={updateField("title")}
                  placeholder="e.g. 2023 BMW 5 Series"
                  className={input}
                  required
                />
              </Field>

              <Field label="Description" icon={FileText} span2>
                <textarea
                  value={formData.description}
                  onChange={updateField("description")}
                  placeholder="Describe your car — features, condition, extras…"
                  className={`${input} min-h-[100px] resize-y leading-relaxed`}
                  rows={4}
                />
              </Field>

            </div>
          </SectionCard>

          {/* Section 2: Vehicle Details */}
          <SectionCard icon={Car} title="Vehicle Details" subtitle="Technical specifications of your car">
            <div className="grid gap-4 md:grid-cols-2">

              <Field label="Car Type" icon={Tag}>
                <input
                  value={formData.carType}
                  onChange={updateField("carType")}
                  placeholder="e.g. SUV, Sedan, Coupe"
                  className={input}
                  required
                />
              </Field>

              <Field label="Brand" icon={Tag}>
                <input
                  value={formData.brand}
                  onChange={updateField("brand")}
                  placeholder="e.g. Toyota, BMW"
                  className={input}
                  required
                />
              </Field>

              <Field label="Model" icon={Cpu}>
                <input
                  value={formData.model}
                  onChange={updateField("model")}
                  placeholder="e.g. Camry, 3 Series"
                  className={input}
                  required
                />
              </Field>

              <Field label="Year" icon={Cpu}>
                <input
                  type="number"
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  value={formData.year}
                  onChange={updateField("year")}
                  placeholder="e.g. 2022"
                  className={input}
                  required
                />
              </Field>

              <Field label="Transmission" icon={Settings2}>
                <div className="relative">
                  <select
                    value={formData.transmission}
                    onChange={updateField("transmission")}
                    className={`${input} appearance-none cursor-pointer pr-9`}
                    required
                  >
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                  <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </Field>

              <Field label="Location" icon={MapPin}>
                <input
                  value={formData.location}
                  onChange={updateField("location")}
                  placeholder="e.g. Algiers, Oran"
                  className={input}
                  required
                />
              </Field>

            </div>
          </SectionCard>

          {/* Section 3: Pricing */}
          <SectionCard icon={DollarSign} title="Pricing" subtitle="Set your daily rental rate">
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
                    placeholder="0"
                    className={`${input} pl-8`}
                    required
                  />
                </div>
              </Field>
            </div>
          </SectionCard>

          {/* Actions */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 pb-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <PrimaryButton
                type="submit"
                fullWidth={false}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-3 text-[0.875rem]"
              >
                <Send size={14} strokeWidth={2} />
                {isSubmitting ? "Submitting…" : "Submit Listing"}
              </PrimaryButton>
            </motion.div>

            <Link
              to="/owner/home"
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 py-3 font-inter text-[0.875rem] font-medium text-slate-700 no-underline shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md hover:text-slate-900"
            >
              <ArrowLeft size={14} strokeWidth={2} />
              Back to Home
            </Link>
          </motion.div>

          {/* Success banner */}
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4"
            >
              <CheckCircle size={17} className="mt-0.5 flex-shrink-0 text-emerald-600" strokeWidth={2} />
              <div>
                <p className="font-inter text-[0.875rem] font-semibold text-emerald-800">
                  Listing submitted successfully!
                </p>
                <p className="font-inter text-[0.8rem] text-emerald-700 leading-relaxed mt-0.5">
                  Your car post has been created and is pending admin review. Redirecting…
                </p>
              </div>
            </motion.div>
          )}

          {/* Error banner */}
          {serverError && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4"
            >
              <AlertCircle size={17} className="mt-0.5 flex-shrink-0 text-red-600" strokeWidth={2} />
              <p className="font-inter text-[0.875rem] text-red-700">{serverError}</p>
            </motion.div>
          )}

        </form>
      </motion.div>
    </OwnerPageLayout>
  );
}
