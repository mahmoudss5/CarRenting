import { useState } from 'react';

/**
 * Manages auth form values, validation errors, and submission.
 * @param {Object} initialFields - e.g. { email: '', password: '' }
 */
export function useAuthForm(initialFields) {
  const [values, setValues] = useState(initialFields);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  /**
   * Returns an onSubmit handler that calls `onSubmit(values)`.
   * Prevents default form submission.
   */
  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return { values, errors, handleChange, handleSubmit };
}
