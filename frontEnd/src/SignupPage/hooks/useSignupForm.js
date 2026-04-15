import { useState } from "react";
import loginSignupService from "../../service/loginSignup/loginSignupService";

const INITIAL_VALUES = {
  role: "",
  fullName: "",
  email: "",
  password: "",
  agreedToTerms: false,
};

function validate(values) {
  const errors = {};
  if (!values.role) {
    errors.role = "Please select a role to continue.";
  }
  if (!values.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }
  if (!values.email) {
    errors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }
  if (!values.agreedToTerms) {
    errors.agreedToTerms = "You must agree to the Terms of Service.";
  }
  return errors;
}

export function useSignupForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successData, setSuccessData] = useState(null); // { role } when signup succeeds

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setValues((prev) => ({ ...prev, [name]: newValue }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (serverError) setServerError("");
  };

  const setRole = (role) => {
    setValues((prev) => ({ ...prev, role }));
    if (errors.role) setErrors((prev) => ({ ...prev, role: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      await loginSignupService.signup({
        full_name: values.fullName,
        email: values.email,
        password: values.password,
        role: values.role,
      });
      setSuccessData({ role: values.role });
    } catch (error) {
      setServerError(error?.data?.error ?? error?.message ?? "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    values,
    errors,
    isLoading,
    serverError,
    successData,
    handleChange,
    setRole,
    handleSubmit,
  };
}
