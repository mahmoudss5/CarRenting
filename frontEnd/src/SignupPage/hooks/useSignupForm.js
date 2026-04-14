import { useState } from "react";
import { useNavigate } from "react-router-dom";

const INITIAL_VALUES = {
  fullName: "",
  email: "",
  password: "",
  licenseFront: null,
  licenseBack: null,
  agreedToTerms: false,
};

function validate(values) {
  const errors = {};
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
  const navigate = useNavigate();
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;
    const newValue = type === "checkbox" ? checked : type === "file" ? files[0] : value;
    setValues((prev) => ({ ...prev, [name]: newValue }));
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
      const formData = new FormData();
      formData.append("fullName", values.fullName);
      formData.append("email", values.email);
      formData.append("password", values.password);
      if (values.licenseFront) formData.append("licenseFront", values.licenseFront);
      if (values.licenseBack) formData.append("licenseBack", values.licenseBack);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setServerError(data.message ?? "Registration failed. Please try again.");
        return;
      }

      navigate("/login");
    } catch {
      setServerError("Unable to connect. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { values, errors, isLoading, serverError, handleChange, handleSubmit };
}
