import apiClient from "../lib/apiClient";

/**
 * POST /api/renter/license  [Requires Auth: Renter]
 * Submit driver license metadata.
 */
export async function submitLicense({ licenseNumber, issuingCountry, expiryDate }) {
  const { data } = await apiClient.post("/api/renter/license", {
    license_number: licenseNumber,
    issuing_country: issuingCountry,
    expiry_date: expiryDate,
  });
  return data;
}

/**
 * POST /api/renter/license/images  [Requires Auth: Renter]
 * Upload front and back images of the driver license.
 */
export async function uploadLicenseImages({ frontImage, backImage }) {
  const formData = new FormData();
  formData.append("front_image", frontImage);
  formData.append("back_image", backImage);
  const { data } = await apiClient.post("/api/renter/license/images", formData);
  return data;
}

/**
 * GET /api/renter/license  [Requires Auth: Renter]
 * Get the renter's current driver license record.
 */
export async function getMyLicense() {
  const { data } = await apiClient.get("/api/renter/license");
  return data;
}

/**
 * GET /api/renter/reviews  [Requires Auth: Renter]
 * Get all reviews written by the renter.
 */
export async function getMyReviews() {
  const { data } = await apiClient.get("/api/renter/reviews");
  return data;
}
