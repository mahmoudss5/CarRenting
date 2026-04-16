import { useState, useEffect } from "react";
import { getMe, updateProfile, changePassword } from "../../services/authService";

export default function useOwnerProfileSettingsForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("idle");

  useEffect(() => {
    getMe()
      .then((data) => {
        setFormData((prev) => ({
          ...prev,
          fullName: data.full_name ?? "",
          email: data.email ?? "",
          phoneNumber: data.phone_number ?? "",
        }));
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const updateField = (field) => (event) => {
    const { value } = event.target;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatusMessage("");

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setStatusType("error");
      setStatusMessage("New password and confirmation do not match.");
      return;
    }

    try {
      await updateProfile({
        fullName: formData.fullName || undefined,
        phoneNumber: formData.phoneNumber || undefined,
      });

      if (formData.newPassword) {
        await changePassword({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        });
        setFormData((prev) => ({ ...prev, currentPassword: "", newPassword: "", confirmPassword: "" }));
      }

      setStatusType("success");
      setStatusMessage("Profile settings updated successfully.");
    } catch (err) {
      setStatusType("error");
      setStatusMessage(err?.response?.data?.message ?? "Failed to update profile settings.");
    }
  };

  return {
    formData,
    isLoading,
    statusMessage,
    statusType,
    updateField,
    handleSubmit,
  };
}
