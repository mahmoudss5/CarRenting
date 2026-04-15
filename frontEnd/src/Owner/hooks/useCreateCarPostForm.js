import { useState } from "react";

const INITIAL_FORM_STATE = {
  ownerName: "",
  title: "",
  description: "",
  carType: "",
  brand: "",
  model: "",
  year: "",
  transmission: "Automatic",
  location: "",
  rentalPrice: "",
  availabilityStart: "",
  availabilityEnd: "",
  ownerRentalStatus: "Pending",
};

export default function useCreateCarPostForm() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateField = (field) => (event) => {
    const { value } = event.target;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return {
    formData,
    isSubmitted,
    updateField,
    handleSubmit,
  };
}
