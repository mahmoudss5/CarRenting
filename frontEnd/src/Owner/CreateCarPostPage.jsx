import { Link } from "react-router-dom";
import PrimaryButton from "../components/ui/PrimaryButton";
import OwnerPageLayout from "./components/OwnerPageLayout";
import useCreateCarPostForm from "./hooks/useCreateCarPostForm";

function EditorialInput({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block font-body text-label-sm uppercase text-on-surface/65">{label}</span>
      {children}
    </label>
  );
}

function fieldClassName() {
  return [
    "w-full rounded-md bg-surface-highest px-4 py-3",
    "font-body text-body-md text-on-surface",
    "border-0 outline-none transition-colors",
    "focus:bg-primary/10 focus:ghost-border",
  ].join(" ");
}

export default function CreateCarPostPage() {
  const { formData, isSubmitted, updateField, handleSubmit } = useCreateCarPostForm();

  return (
    <OwnerPageLayout>
      <section className="rounded-card bg-surface-low p-6 md:p-8">
        <p className="font-body text-label-sm uppercase text-primary">Owner Publishing</p>
        <h1 className="mt-2 font-display text-display-sm text-on-surface md:text-display-lg">Create New Car Post</h1>
        <p className="mt-3 max-w-[60ch] font-body text-body-md text-on-surface/80">
          Build a listing with complete editorial details so renters and admins can review it clearly.
        </p>
      </section>

      <form onSubmit={handleSubmit} className="mt-8 rounded-card bg-surface-dim p-6 md:p-7">
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

          <EditorialInput label="Availability Calendar - Start">
            <input
              type="date"
              value={formData.availabilityStart}
              onChange={updateField("availabilityStart")}
              className={fieldClassName()}
              required
            />
          </EditorialInput>

          <EditorialInput label="Availability Calendar - End">
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
          <PrimaryButton type="submit" fullWidth={false} className="px-7">
            Submit Post
          </PrimaryButton>
          <Link
            to="/owner/home"
            className="rounded-md bg-surface-high px-5 py-3 font-body text-body-md text-on-surface no-underline transition-colors hover:bg-surface-highest"
          >
            Back to Owner Home
          </Link>
        </div>

        {isSubmitted ? (
          <p className="mt-5 rounded-md bg-secondary-container px-4 py-3 font-body text-body-md text-on-secondary">
            Post created locally. Next step is API integration to persist the listing and send admin approval request.
          </p>
        ) : null}
      </form>
    </OwnerPageLayout>
  );
}
