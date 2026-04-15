import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginSignupService from "../../service/loginSignup/loginSignupService";

const INITIAL_VALUES = { email: "", password: "" };

function validate(values) {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }
  return errors;
}

function redirectByRole(role, navigate) {
  if (role === "Admin") return navigate("/admin");
  if (role === "CarOwner") return navigate("/owner/home");
  navigate("/renter-home");
}

export function useLoginForm() {
  const navigate = useNavigate();
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (serverError) setServerError("");
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
      const data = await loginSignupService.login(values);
      redirectByRole(data.user?.role, navigate);
    } catch (error) {
      setServerError(error?.data?.error ?? error?.message ?? "Unable to connect. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { values, errors, isLoading, serverError, handleChange, handleSubmit };
}
