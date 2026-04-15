import PageLayout from '../../shared/layouts/PageLayout';
import ConfirmRequestForm from './components/ConfirmRequestForm';
import { useConfirmRequest } from './hooks/useConfirmRequest';

export default function RenterConfirmRequestPage() {
  const {
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
    handleSubmit,
  } = useConfirmRequest();

  return (
    <PageLayout>
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-10 py-12">
          <ConfirmRequestForm
            data={data}
            cvv={cvv}
            phoneVerified={phoneVerified}
            termsAccepted={termsAccepted}
            total={total}
            canConfirm={canConfirm}
            message={message}
            setCvv={setCvv}
            setPhoneVerified={setPhoneVerified}
            setTermsAccepted={setTermsAccepted}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </PageLayout>
  );
}
