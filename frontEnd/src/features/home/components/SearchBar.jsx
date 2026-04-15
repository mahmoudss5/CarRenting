import EditorialInput from '../../../shared/components/EditorialInput';
import PrimaryButton from '../../../shared/components/PrimaryButton';

const CAR_TYPE_OPTIONS = [
  { value: '', label: 'All Vehicles' },
  { value: 'electric', label: 'Electric' },
  { value: 'suv', label: 'SUV' },
  { value: 'performance', label: 'Performance' },
  { value: 'luxury', label: 'Luxury' },
];

/**
 * Controlled search form. All state lives in the parent (useSearch hook).
 */
export default function SearchBar({ values, onChange, onSearch }) {
  return (
    <div
      className="rounded-2xl p-8 w-full"
      style={{
        background: 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 8px 40px rgba(20, 27, 44, 0.12)',
      }}
    >
      <form onSubmit={onSearch} className="flex flex-col gap-4">
        {/* Location */}
        <EditorialInput
          id="search-location"
          name="location"
          label="Location"
          placeholder="Where to?"
          value={values.location}
          onChange={onChange}
        />

        {/* Date row */}
        <div className="grid grid-cols-2 gap-3">
          <EditorialInput
            id="search-from"
            name="from"
            type="date"
            label="From"
            placeholder="mm/dd/yyyy"
            value={values.from}
            onChange={onChange}
          />
          <EditorialInput
            id="search-to"
            name="to"
            type="date"
            label="Return"
            placeholder="mm/dd/yyyy"
            value={values.to}
            onChange={onChange}
          />
        </div>

        {/* Car type */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="search-car-type"
            className="text-label-sm font-bold tracking-[0.05em] uppercase text-on-surface/50"
          >
            Car Type
          </label>
          <select
            id="search-car-type"
            name="carType"
            value={values.carType}
            onChange={onChange}
            className="w-full px-4 py-3 rounded-md text-body-md font-inter text-on-surface bg-surface-container-highest outline-none focus:ring-1 focus:ring-primary/20 transition-all duration-200 appearance-none cursor-pointer"
          >
            {CAR_TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <PrimaryButton type="submit" size="lg" className="w-full mt-1">
          Search Available Cars
        </PrimaryButton>
      </form>
    </div>
  );
}
