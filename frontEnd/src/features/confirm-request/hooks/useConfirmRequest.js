import { useMemo, useState } from 'react';
import { CONFIRM_REQUEST_DATA } from '../data/confirmRequestData';

export function useConfirmRequest() {
  const [cvv, setCvv] = useState('');
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [message, setMessage] = useState('');

  const total = useMemo(() => {
    const { rental, insurance, serviceFee, deposit } = CONFIRM_REQUEST_DATA.breakdown;
    return rental + insurance + serviceFee + deposit;
  }, []);

  const canConfirm = cvv.trim().length >= 3 && phoneVerified && termsAccepted;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canConfirm) {
      setMessage('Please complete CVV, phone verification, and terms acceptance.');
      return;
    }
    setMessage('Request confirmed. Waiting for host approval.');
  };

  return {
    data: CONFIRM_REQUEST_DATA,
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
  };
}
