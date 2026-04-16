import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCar } from "../../services/carService";

/**
 * Fields map exactly to CreateCarPostRequestDto:
 *   Title (required), Description (optional), CarType (required),
 *   Brand (required), Model (required), Year (required, short),
 *   Transmission (required), Location (required), RentalPrice (required, decimal > 0)
 *
 * No extra keys are sent — no ownerName, ownerRentalStatus, or availability dates.
 */
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
      // Payload matches CreateCarPostRequestDto exactly — no extra keys
      await createCar({
        title: formData.title.trim(),
        description: formData.description.trim() || undefined,
        carType: formData.carType.trim(),
        brand: formData.brand.trim(),
        model: formData.model.trim(),
        year: Number(formData.year),
        transmission: formData.transmission,
        location: formData.location.trim(),
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
