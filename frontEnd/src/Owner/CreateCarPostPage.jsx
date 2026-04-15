import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Car, ArrowLeft, Send, CheckCircle } from "lucide-react";
import PrimaryButton from "../components/ui/PrimaryButton";
import OwnerPageLayout from "./components/OwnerPageLayout";
import useCreateCarPostForm from "./hooks/useCreateCarPostForm";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};
const stagger = {
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

function EditorialInput({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block font-body text-label-sm uppercase text-on-surface/60 tracking-[0.04em]">{label}</span>
      {children}
    </label>
  );
}

function fieldClassName() {
  return [
    "w-full rounded-lg bg-surface-highest px-4 py-3",
    "font-body text-body-md text-on-surface",
    "border border-transparent outline-none transition-all duration-200",
    "focus:bg-surface-low focus:border-primary/30 focus:ring-2 focus:ring-primary/10",
  ].join(" ");
}

export default function CreateCarPostPage() {
  const { formData, isSubmitted, updateField, handleSubmit } = useCreateCarPostForm();

  return (
    <OwnerPageLayout>
      <motion.div variants={stagger} initial="hidden" animate="show">
        <motion.section
          variants={fadeUp}
          className="relative overflow-hidden rounded-2xl bg-surface-low border border-surface-dim p-6 md:p-8 mb-8"
        >
          <div className="absolute -right-10 top-6 h-40 w-40 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
          <div className="flex items-center gap-2 mb-2">
            <Car size={16} className="text-primary" strokeWidth={1.8} />
            <p className="font-body text-label-sm uppercase text-primary tracking-[0.05em]">Owner Publishing</p>
          </div>
          <h1 className="mt-1 font-display text-display-sm text-on-surface md:text-display-lg">
            Create New Car Post
          </h1>
          <p className="mt-3 max-w-[60ch] font-body text-body-md text-on-surface/65 leading-relaxed">
            Build a listing with complete editorial details so renters and admins can review it clearly.
          </p>
        </motion.section>

        <motion.form
          variants={fadeUp}
          onSubmit={handleSubmit}
          className="rounded-2xl bg-surface-dim border border-surface-dim p-6 md:p-7"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <EditorialInput label="Owner Name">
              <input value={formData.ownerName} onChange={updateField("ownerName")} className={fieldClassName()} required />
            </EditorialInput>

            <EditorialInput label="Title">
              <input value={formData.title} onChange={updateField("title")} className={fieldClassName()} required />
            </EditorialInput>

            <div className="md:col-span-2">
              <EditorialInput label="Description">
                <textarea
                  value={formData.description}
                  onChange={updateField("description")}
                  className={fieldClassName()}
                  rows={4}
                  required
                />
              </EditorialInput>
            </div>

            <EditorialInput label="Car Type">
              <input value={formData.carType} onChange={updateField("carType")} className={fieldClassName()} required />
            </EditorialInput>

            <EditorialInput label="Brand">
              <input value={formData.brand} onChange={updateField("brand")} className={fieldClassName()} required />
            </EditorialInput>

            <EditorialInput label="Model">
              <input value={formData.model} onChange={updateField("model")} className={fieldClassName()} required />
            </EditorialInput>

            <EditorialInput label="Year">
              <input value={formData.year} onChange={updateField("year")} className={fieldClassName()} required />
            </EditorialInput>

            <EditorialInput label="Transmission">
              <select value={formData.transmission} onChange={updateField("transmission")} className={fieldClassName()} required>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </EditorialInput>

            <EditorialInput label="Location">
              <input value={formData.location} onChange={updateField("location")} className={fieldClassName()} required />
            </EditorialInput>

            <EditorialInput label="Rental Price (Per Day)">
              <input
                type="number"
                min="1"
                value={formData.rentalPrice}
                onChange={updateField("rentalPrice")}
                className={fieldClassName()}
                required
              />
            </EditorialInput>

            <EditorialInput label="Availability - Start Date">
              <input
                type="date"
                value={formData.availabilityStart}
                onChange={updateField("availabilityStart")}
                className={fieldClassName()}
                required
              />
            </EditorialInput>

            <EditorialInput label="Availability - End Date">
              <input
                type="date"
                value={formData.availabilityEnd}
                onChange={updateField("availabilityEnd")}
                className={fieldClassName()}
                required
              />
            </EditorialInput>

            <EditorialInput label="Owner Rental Status">
              <select value={formData.ownerRentalStatus} onChange={updateField("ownerRentalStatus")} className={fieldClassName()}>
                <option value="Pending">Pending</option>
                <option value="Active">Active</option>
                <option value="Rented">Rented</option>
              </select>
            </EditorialInput>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <PrimaryButton type="submit" fullWidth={false} className="flex items-center gap-1.5 px-7">
                <Send size={15} strokeWidth={2} />
                Submit Post
              </PrimaryButton>
            </motion.div>
            <Link
              to="/owner/home"
              className="flex items-center gap-1.5 rounded-lg bg-surface-high border border-surface-dim px-5 py-3 font-body text-body-md text-on-surface no-underline transition-colors hover:bg-surface-highest"
            >
              <ArrowLeft size={15} strokeWidth={1.8} />
              Back to Home
            </Link>
          </div>

          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 flex items-start gap-2.5 rounded-xl bg-secondary-container px-4 py-4"
            >
              <CheckCircle size={17} className="text-on-secondary mt-0.5 flex-shrink-0" strokeWidth={1.8} />
              <p className="font-body text-body-md text-on-secondary leading-relaxed">
                Post created locally. Next step is API integration to persist the listing and send admin approval request.
              </p>
            </motion.div>
          )}
        </motion.form>
      </motion.div>
    </OwnerPageLayout>
  );
}
