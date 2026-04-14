import EditorialInput from '../../../shared/components/EditorialInput';
import PrimaryButton from '../../../shared/components/PrimaryButton';

function PriceRow({ label, value, total = false }) {
  return (
    <div className={`flex items-center justify-between py-2 ${total ? 'border-t border-outline-variant/25 mt-2 pt-3' : ''}`}>
      <span className={total ? 'font-manrope font-bold text-on-surface' : 'font-inter text-body-md text-on-surface/60'}>
        {label}
      </span>
      <span className={total ? 'font-manrope font-extrabold text-primary' : 'font-inter font-semibold text-on-surface'}>
        ${value.toFixed(2)}
      </span>
    </div>
  );
}

export default function ConfirmRequestForm({
  data,
  cvv,
  phoneVerified,
  termsAccepted,
  total,
  canConfirm,
  message,
  setCvv,
  setPhoneVerified,
  setTermsAccepted,
  onSubmit,
}) {
  const { rental, insurance, serviceFee, deposit } = data.breakdown;

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="rounded-2xl bg-surface p-6 shadow-card space-y-5">
        <div>
          <p className="font-inter text-label-sm font-bold uppercase tracking-[0.05em] text-primary">
            Renter Checkout
          </p>
          <h1 className="mt-2 font-manrope text-display-sm font-extrabold text-on-surface">
            Confirm Request
          </h1>
          <p className="mt-2 font-inter text-body-md text-on-surface/60">
            Finalize payment and verification before sending this request.
          </p>
        </div>

        <div className="rounded-xl bg-surface-container-low p-4">
          <p className="font-manrope text-title-md font-bold text-on-surface">{data.carName}</p>
          <p className="font-inter text-body-md text-on-surface/60">
            Host: {data.hostName} · {data.location}
          </p>
          <p className="mt-2 font-inter text-body-md text-on-surface/70">Pickup: {data.pickup}</p>
          <p className="font-inter text-body-md text-on-surface/70">Dropoff: {data.dropoff}</p>
        </div>

        <EditorialInput
          id="cvv"
          name="cvv"
          label="Payment CVV"
          type="password"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
        />

        <label className="flex items-center justify-between rounded-xl bg-surface-container-low px-4 py-3 font-inter text-body-md">
          Phone verified
          <input
            type="checkbox"
            checked={phoneVerified}
            onChange={(e) => setPhoneVerified(e.target.checked)}
            className="h-5 w-5 accent-primary"
          />
        </label>

        <label className="flex items-center justify-between rounded-xl bg-surface-container-low px-4 py-3 font-inter text-body-md">
          Accept rental terms
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="h-5 w-5 accent-primary"
          />
        </label>

        <div className="flex items-center justify-between gap-3">
          <p className="font-inter text-body-md text-on-surface/60">{message}</p>
          <PrimaryButton
            type="submit"
            style={{ opacity: canConfirm ? 1 : 0.7, pointerEvents: canConfirm ? 'auto' : 'none' }}
          >
            Confirm Request
          </PrimaryButton>
        </div>
      </section>

      <aside className="rounded-2xl bg-surface p-6 shadow-card h-fit">
        <h2 className="font-manrope text-headline-sm font-bold text-on-surface">Payment Summary</h2>
        <div className="mt-4">
          <PriceRow label="Rental" value={rental} />
          <PriceRow label="Insurance" value={insurance} />
          <PriceRow label="Service Fee" value={serviceFee} />
          <PriceRow label="Security Deposit" value={deposit} />
          <PriceRow label="Total Due" value={total} total />
        </div>
      </aside>
    </form>
  );
}
