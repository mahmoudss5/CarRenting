import apiClient from "../lib/apiClient";

// ─── Driver License ───────────────────────────────────────────────────────────

/**
 * POST /api/renter/license  [Requires Auth: Renter]
 * Submit license details (step 1, before uploading images).
 * Body: { license_number, issuing_country, expiry_date }
 * expiry_date must be "YYYY-MM-DD" string.
 */
export async function submitLicense({ licenseNumber, issuingCountry, expiryDate }) {
  const { data } = await apiClient.post("/api/renter/license", {
    license_number: licenseNumber,
    issuing_country: issuingCountry,
    expiry_date: expiryDate,
  });
  return data;
  // { message, license: { license_id, license_number, issuing_country, expiry_date,
  //                        front_image_url, back_image_url, verification_status, submitted_at } }
}

/**
 * POST /api/renter/license/images  [Requires Auth: Renter]
 * Upload front and back images for the license (step 2, after submitLicense).
 * Sends multipart/form-data with fields: front_image, back_image.
 * Allowed formats: JPG, PNG, WEBP. Max 5 MB per file.
 */
export async function uploadLicenseImages({ frontImage, backImage }) {
  const formData = new FormData();
  formData.append("front_image", frontImage);
  formData.append("back_image", backImage);
  const { data } = await apiClient.post("/api/renter/license/images", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

/**
 * GET /api/renter/license  [Requires Auth: Renter]
 * Get the logged-in renter's driver license details.
 */
export async function getMyLicense() {
  const { data } = await apiClient.get("/api/renter/license");
  return data;
  // { license_id, license_number, issuing_country, expiry_date,
  //   front_image_url, back_image_url, verification_status, submitted_at }
}

// ─── Reviews ─────────────────────────────────────────────────────────────────

/**
 * GET /api/renter/reviews  [Requires Auth: Renter]
 * Get the reviews submitted by the logged-in renter.
 */
export async function getMyReviews() {
  const { data } = await apiClient.get("/api/renter/reviews");
  return data;
  // [{ review_id, car_title, rating, feedback, created_at }]
}
