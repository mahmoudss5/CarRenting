import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCarById, updateCar } from "../../services/carService";

/**
 * Editable fields match UpdateCarPostRequestDto exactly:
 *   Title, Description, RentalPrice, Location, Transmission
 * (Brand, Model, Year, CarType are immutable after creation.)
 */
export default function useEditCarPostForm(postId) {
  const navigate = useNavigate();

  const [originalCar, setOriginalCar] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rentalPrice: "",
    location: "",
    transmission: "Automatic",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  // Load existing car data to pre-fill the form
  useEffect(() => {
    if (!postId) return;
    setIsLoading(true);
    setLoadError(null);
    getCarById(postId)
      .then((data) => {
        setOriginalCar(data);
        setFormData({
          title: data.title ?? "",
          description: data.description ?? "",
          rentalPrice: String(data.rental_price ?? ""),
          location: data.location ?? "",
          transmission: data.transmission ?? "Automatic",
        });
      })
      .catch(() => setLoadError("Failed to load car details. Please go back and try again."))
      .finally(() => setIsLoading(false));
  }, [postId]);

  const updateField = (field) => (event) => {
    const { value } = event.target;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError("");
    setIsSubmitting(true);
    try {
      await updateCar(postId, {
        title: formData.title.trim() || undefined,
        description: formData.description.trim() || undefined,
        rentalPrice: formData.rentalPrice ? Number(formData.rentalPrice) : undefined,
        location: formData.location.trim() || undefined,
        transmission: formData.transmission || undefined,
      });
      setIsSubmitted(true);
      setTimeout(() => navigate("/owner/home"), 2000);
    } catch (err) {
      const msg =
        err?.response?.data?.message ??
        err?.response?.data?.error ??
        "Failed to update car post. Please try again.";
      setServerError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    originalCar,
    formData,
    isLoading,
    loadError,
    isSubmitting,
    isSubmitted,
    serverError,
    updateField,
    handleSubmit,
  };
}
