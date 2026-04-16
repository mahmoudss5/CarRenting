import apiClient from "../lib/apiClient";

/**
 * GET /api/owner/cars  [Requires Auth: CarOwner]
 * Get all cars posted by the logged-in owner.
 */
export async function getMyCars() {
  const { data } = await apiClient.get("/api/owner/cars");
  return data;
  // [{ post_id, title, approval_status, rental_status, rental_price, created_at }]
}

/**
 * GET /api/owner/rentals  [Requires Auth: CarOwner]
 * Get all rental requests for the owner's cars.
 */
export async function getOwnerRentals() {
  const { data } = await apiClient.get("/api/owner/rentals");
  return data;
  // [{ request_id, renter_name, car_title, start_date, end_date,
  //    total_price, status, requested_at }]
}

/**
 * PATCH /api/owner/rentals/:id/accept  [Requires Auth: CarOwner]
 * Accept a rental request.
 */
export async function acceptRental(id) {
  const { data } = await apiClient.patch(`/api/owner/rentals/${id}/accept`);
  return data;
  // { message, request_id, status, car_rental_status? }
}

/**
 * PATCH /api/owner/rentals/:id/reject  [Requires Auth: CarOwner]
 * Reject a rental request.
 * Body: { reason }
 */
export async function rejectRental(id, reason) {
  const { data } = await apiClient.patch(`/api/owner/rentals/${id}/reject`, { reason });
  return data;
  // { message, request_id, status, car_rental_status? }
}
