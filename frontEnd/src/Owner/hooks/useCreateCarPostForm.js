import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCar } from "../../services/carService";

const INITIAL_FORM_STATE = {
  title: "",
  description: "",
  carType: "",
  brand: "",
  model: "",
  year: "",
  transmission: "Automatic",
  location: "",
  rentalPrice: "",
};

export default function useCreateCarPostForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const updateField = (field) => (event) => {
    const { value } = event.target;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError("");
    setIsSubmitting(true);
    try {
      await createCar({
        title: formData.title,
        description: formData.description || undefined,
        carType: formData.carType,
        brand: formData.brand,
        model: formData.model,
        year: Number(formData.year),
        transmission: formData.transmission,
        location: formData.location,
        rentalPrice: Number(formData.rentalPrice),
      });
      setIsSubmitted(true);
      setTimeout(() => navigate("/owner/home"), 2000);
    } catch (err) {
      const msg =
        err?.response?.data?.message ??
        err?.response?.data?.error ??
        "Failed to create car post. Please try again.";
      setServerError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitted,
    isSubmitting,
    serverError,
    updateField,
    handleSubmit,
  };
}
