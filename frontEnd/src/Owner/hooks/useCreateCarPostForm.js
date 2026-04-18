import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createCar, addCarImage } from "../../services/carService";

/**
 * Fields map exactly to CreateCarPostRequestDto:
 *   Title (required), Description (optional), CarType (required),
 *   Brand (required), Model (required), Year (required, short),
 *   Transmission (required), Location (required), RentalPrice (required, decimal > 0)
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

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
export const MAX_IMAGE_COUNT = 10;

export default function useCreateCarPostForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [images, setImages] = useState([]); // { file: File, preview: string, id: string }[]
  const [imageErrors, setImageErrors] = useState([]); // validation error messages
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });

  // Revoke object URLs when component unmounts to avoid memory leaks
  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.preview));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateField = (field) => (event) => {
    const { value } = event.target;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addImages = useCallback((files) => {
    const fileArray = Array.from(files);
    const errors = [];
    const valid = [];

    fileArray.forEach((file) => {
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        errors.push(`"${file.name}" — unsupported format. Use JPG, PNG, GIF, or WebP.`);
        return;
      }
      if (file.size > MAX_IMAGE_SIZE_BYTES) {
        errors.push(`"${file.name}" — exceeds 5 MB limit.`);
        return;
      }
      valid.push(file);
    });

    setImageErrors(errors);

    setImages((prev) => {
      const remaining = MAX_IMAGE_COUNT - prev.length;
      if (remaining <= 0) {
        setImageErrors((e) => [...e, `Maximum ${MAX_IMAGE_COUNT} images allowed.`]);
        return prev;
      }
      const toAdd = valid.slice(0, remaining);
      return [
        ...prev,
        ...toAdd.map((file) => ({
          file,
          preview: URL.createObjectURL(file),
          id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
        })),
      ];
    });
  }, []);

  const removeImage = useCallback((id) => {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target) URL.revokeObjectURL(target.preview);
      return prev.filter((img) => img.id !== id);
    });
    setImageErrors([]);
  }, []);

  const clearImageErrors = useCallback(() => setImageErrors([]), []);

  const clearAllImages = useCallback(() => {
    setImages((prev) => {
      prev.forEach((img) => URL.revokeObjectURL(img.preview));
      return [];
    });
    setImageErrors([]);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError("");
    setIsSubmitting(true);
    setUploadProgress({ current: 0, total: 0 });

    try {
      // Step 1 — create the car post (JSON)
      const result = await createCar({
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

      // Step 2 — upload images (if any) using the returned post_id
      const postId = result?.post?.post_id;
      if (postId && images.length > 0) {
        setUploadProgress({ current: 0, total: images.length });
        for (let i = 0; i < images.length; i++) {
          const isPrimary = i === 0;
          try {
            await addCarImage(postId, images[i].file, isPrimary);
          } catch {
            // Image upload failures are non-fatal — the post still exists
          }
          setUploadProgress({ current: i + 1, total: images.length });
        }
      }

      // Cleanup previews before navigating
      images.forEach((img) => URL.revokeObjectURL(img.preview));

      setIsSubmitted(true);
      setTimeout(() => navigate("/owner/home"), 2200);
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
    images,
    imageErrors,
    uploadProgress,
    isSubmitted,
    isSubmitting,
    serverError,
    updateField,
    addImages,
    removeImage,
    clearImageErrors,
    clearAllImages,
    handleSubmit,
  };
}
