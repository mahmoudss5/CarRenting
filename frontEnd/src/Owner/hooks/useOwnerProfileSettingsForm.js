import { useState } from "react";

const INITIAL_STATE = {
  username: "maria.owner",
  email: "maria.owner@driveshare.com",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function useOwnerProfileSettingsForm() {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("idle");

  const updateField = (field) => (event) => {
    const { value } = event.target;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setStatusType("error");
      setStatusMessage("New password and confirmation do not match.");
      return;
    }

    setStatusType("success");
    setStatusMessage("Profile settings updated locally. Connect API to persist these changes.");
  };

  return {
    formData,
    statusMessage,
    statusType,
    updateField,
    handleSubmit,
  };
}
