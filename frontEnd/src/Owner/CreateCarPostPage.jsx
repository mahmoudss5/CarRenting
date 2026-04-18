import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  ImagePlus,
  X,
  Upload,
  Star,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import PrimaryButton from "../components/ui/PrimaryButton";
import OwnerPageLayout from "./components/OwnerPageLayout";
import useCreateCarPostForm, {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_SIZE_BYTES,
  MAX_IMAGE_COUNT,
} from "./hooks/useCreateCarPostForm";
import { getUser } from "../lib/auth";

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } } };

// ─── Shared input class ───────────────────────────────────────────────────────

const inputCls =
  "w-full rounded-xl bg-white border border-slate-200 px-4 py-3 font-inter text-[0.875rem] text-slate-800 outline-none placeholder:text-slate-400 transition-all duration-200 hover:border-blue-300 hover:shadow-sm focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 focus:shadow-md";

// ─── Field wrapper ────────────────────────────────────────────────────────────

function Field({ label, icon: Icon, children, span2 = false, required = false }) {
  return (
    <div className={span2 ? "md:col-span-2" : ""}>
      <label className="block">
        <span className="mb-1.5 flex items-center gap-1.5 font-inter text-[0.7rem] font-semibold uppercase tracking-widest text-slate-500">
          {Icon && <Icon size={11} className="text-blue-500" strokeWidth={2.2} />}
          {label}
          {required && <span className="text-red-400 ml-0.5">*</span>}
        </span>
        {children}
      </label>
    </div>
  );
}

// ─── Section card ─────────────────────────────────────────────────────────────

function SectionCard({ icon: Icon, title, subtitle, children, accentColor = "blue" }) {
  const colorMap = {
    blue:   { bg: "bg-blue-50",   icon: "text-blue-600",   ring: "ring-blue-100"   },
    violet: { bg: "bg-violet-50", icon: "text-violet-600", ring: "ring-violet-100" },
  };
  const c = colorMap[accentColor] ?? colorMap.blue;

  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl border border-slate-200/80 bg-white shadow-[0_2px_16px_rgba(15,23,42,0.06)] hover:shadow-[0_6px_28px_rgba(15,23,42,0.09)] transition-shadow duration-300"
    >
      <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
        <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${c.bg} ring-1 ${c.ring}`}>
          <Icon size={16} className={c.icon} strokeWidth={2} />
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

// ─── Image dropzone ───────────────────────────────────────────────────────────

function ImageDropzone({ onFilesSelected, disabled }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const accept = ALLOWED_IMAGE_TYPES.join(",");

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    const files = e.dataTransfer?.files;
    if (files?.length) onFilesSelected(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDragging(false)}
      onClick={() => !disabled && inputRef.current?.click()}
      className={`
        relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed
        px-6 py-10 text-center cursor-pointer select-none transition-all duration-200
        ${isDragging
          ? "border-blue-500 bg-blue-50 scale-[1.01]"
          : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/50"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-200 ${isDragging ? "bg-blue-200" : "bg-slate-200"}`}>
        <Upload size={24} className={isDragging ? "text-blue-600" : "text-slate-500"} strokeWidth={1.8} />
      </div>
      <div>
        <p className="font-inter text-[0.875rem] font-semibold text-slate-700">
          Drop images here, or{" "}
          <span className="text-blue-600 underline underline-offset-2">browse files</span>
        </p>
        <p className="mt-1 font-inter text-[0.75rem] text-slate-500">
          JPG, PNG, GIF, WebP · max 5 MB each · up to {MAX_IMAGE_COUNT} images
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        className="hidden"
        onChange={(e) => { if (e.target.files?.length) onFilesSelected(e.target.files); e.target.value = ""; }}
        disabled={disabled}
      />
    </div>
  );
}

// ─── Image preview grid ───────────────────────────────────────────────────────

function ImagePreviewGrid({ images, onRemove, disabled }) {
  if (!images.length) return null;
  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      <AnimatePresence>
        {images.map((img, index) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.18 }}
            className="relative group rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-100 shadow-sm"
          >
            <img
              src={img.preview}
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Primary badge */}
            {index === 0 && (
              <div className="absolute top-1.5 left-1.5 flex items-center gap-1 rounded-full bg-amber-400/90 backdrop-blur-sm px-2 py-0.5">
                <Star size={9} className="text-white fill-white" strokeWidth={2} />
                <span className="font-inter text-[0.6rem] font-bold text-white uppercase tracking-wide">Primary</span>
              </div>
            )}
            {/* Remove button */}
            <button
              type="button"
              onClick={() => !disabled && onRemove(img.id)}
              disabled={disabled}
              className="absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 hover:bg-red-500 transition-all duration-150 disabled:cursor-not-allowed"
            >
              <X size={11} strokeWidth={3} />
            </button>
            {/* Image number */}
            <div className="absolute bottom-1.5 right-1.5 rounded-full bg-black/50 backdrop-blur-sm px-1.5 py-0.5">
              <span className="font-inter text-[0.6rem] font-semibold text-white">{index + 1}/{images.length}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Upload progress bar ──────────────────────────────────────────────────────

function UploadProgressBar({ current, total }) {
  if (total === 0) return null;
  const pct = Math.round((current / total) * 100);
  return (
    <div className="mt-3">
      <div className="flex items-center justify-between mb-1">
        <span className="font-inter text-[0.75rem] text-slate-600 font-medium">
          Uploading images… {current}/{total}
        </span>
        <span className="font-inter text-[0.75rem] text-blue-600 font-semibold">{pct}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CreateCarPostPage() {
  const {
    formData,
    images,
    imageErrors,
    uploadProgress,
    isSubmitted,
    isSubmitting,
    serverError,
    updateField,
    addImages,
    removeImage,
    clearImageErrors,
    clearAllImages,
    handleSubmit,
  } = useCreateCarPostForm();

  const user = getUser();
  const canAddMore = images.length < MAX_IMAGE_COUNT;

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
            Create New Car Listing
          </h1>
          <p className="mt-2 max-w-[55ch] font-inter text-[0.9rem] text-slate-500 leading-relaxed">
            Fill in your vehicle details and upload photos. Your submission will be reviewed by our admin team before going live.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* ── Section 1: Listing Info ── */}
          <SectionCard icon={User} title="Listing Info" subtitle="Identify this listing">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Owner display — read-only */}
              <div className="md:col-span-2 flex items-center gap-2 rounded-xl bg-slate-50 border border-slate-200 px-4 py-3">
                <User size={14} className="text-blue-500 shrink-0" strokeWidth={2} />
                <span className="font-inter text-[0.75rem] font-semibold uppercase tracking-widest text-slate-400 mr-2">
                  Owner
                </span>
                <span className="font-inter text-[0.875rem] font-medium text-slate-700">
                  {user?.full_name ?? "—"}
                </span>
              </div>

              <Field label="Listing Title" icon={FileText} required>
                <input
                  value={formData.title}
                  onChange={updateField("title")}
                  placeholder="e.g. 2023 BMW 5 Series"
                  className={inputCls}
                  required
                  disabled={isSubmitting}
                />
              </Field>

              <Field label="Description" icon={FileText} span2>
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

          {/* ── Section 2: Vehicle Details ── */}
          <SectionCard icon={Car} title="Vehicle Details" subtitle="Technical specifications of your car">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Car Type" icon={Tag} required>
                <input
                  value={formData.carType}
                  onChange={updateField("carType")}
                  placeholder="e.g. SUV, Sedan, Coupe"
                  className={inputCls}
                  required
                  disabled={isSubmitting}
                />
              </Field>

              <Field label="Brand" icon={Tag} required>
                <input
                  value={formData.brand}
                  onChange={updateField("brand")}
                  placeholder="e.g. Toyota, BMW"
                  className={inputCls}
                  required
                  disabled={isSubmitting}
                />
              </Field>

              <Field label="Model" icon={Cpu} required>
                <input
                  value={formData.model}
                  onChange={updateField("model")}
                  placeholder="e.g. Camry, 3 Series"
                  className={inputCls}
                  required
                  disabled={isSubmitting}
                />
              </Field>

              <Field label="Year" icon={Cpu} required>
                <input
                  type="number"
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  value={formData.year}
                  onChange={updateField("year")}
                  placeholder="e.g. 2022"
                  className={inputCls}
                  required
                  disabled={isSubmitting}
                />
              </Field>

              <Field label="Transmission" icon={Settings2} required>
                <div className="relative">
                  <select
                    value={formData.transmission}
                    onChange={updateField("transmission")}
                    className={`${inputCls} appearance-none cursor-pointer pr-9`}
                    required
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

              <Field label="Location" icon={MapPin} required>
                <input
                  value={formData.location}
                  onChange={updateField("location")}
                  placeholder="e.g. Algiers, Oran"
                  className={inputCls}
                  required
                  disabled={isSubmitting}
                />
              </Field>
            </div>
          </SectionCard>

          {/* ── Section 3: Pricing ── */}
          <SectionCard icon={DollarSign} title="Pricing" subtitle="Set your daily rental rate">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Rental Price (Per Day)" icon={DollarSign} required>
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
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </Field>
            </div>
          </SectionCard>

          {/* ── Section 4: Photos ── */}
          <SectionCard
            icon={ImagePlus}
            title="Photos"
            subtitle={`Upload up to ${MAX_IMAGE_COUNT} images · JPG, PNG, GIF, WebP · max 5 MB each`}
            accentColor="violet"
          >
            <ImageDropzone onFilesSelected={addImages} disabled={isSubmitting || !canAddMore} />

            {/* Preview grid */}
            <ImagePreviewGrid images={images} onRemove={removeImage} disabled={isSubmitting} />

            {/* Upload progress */}
            {isSubmitting && uploadProgress.total > 0 && (
              <UploadProgressBar current={uploadProgress.current} total={uploadProgress.total} />
            )}

            {/* Image count indicator */}
            {images.length > 0 && (
              <div className="mt-3 flex items-center justify-between">
                <p className="font-inter text-[0.78rem] text-slate-500">
                  <span className="font-semibold text-slate-700">{images.length}</span> of{" "}
                  {MAX_IMAGE_COUNT} images added · first image will be the primary photo
                </p>
                {images.length > 0 && (
                  <button
                    type="button"
                    onClick={clearAllImages}
                    className="font-inter text-[0.75rem] text-red-500 hover:text-red-700 hover:underline transition-colors"
                  >
                    Remove all
                  </button>
                )}
              </div>
            )}

            {/* Validation errors */}
            <AnimatePresence>
              {imageErrors.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      <AlertTriangle size={14} className="text-amber-600 mt-0.5 shrink-0" strokeWidth={2} />
                      <div>
                        {imageErrors.map((err, i) => (
                          <p key={i} className="font-inter text-[0.8rem] text-amber-800">{err}</p>
                        ))}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={clearImageErrors}
                      className="text-amber-400 hover:text-amber-700 transition-colors shrink-0"
                    >
                      <X size={13} strokeWidth={2.5} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
                    {uploadProgress.total > 0 ? `Uploading… ${uploadProgress.current}/${uploadProgress.total}` : "Submitting…"}
                  </>
                ) : (
                  <>
                    <Send size={14} strokeWidth={2} />
                    Submit Listing
                    {images.length > 0 && (
                      <span className="ml-1 rounded-full bg-white/20 px-1.5 py-0.5 text-[0.7rem] font-bold">
                        +{images.length} photo{images.length > 1 ? "s" : ""}
                      </span>
                    )}
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
                    Listing submitted successfully!
                  </p>
                  <p className="font-inter text-[0.8rem] text-emerald-700 leading-relaxed mt-0.5">
                    Your car post has been created and is pending admin review. Redirecting to your listings…
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
