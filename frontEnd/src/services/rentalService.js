import apiClient from "../lib/apiClient";

/**
 * POST /api/rentals  [Requires Auth: Renter]
 * Create a rental request.
 * Body: { post_id, start_date, end_date }
 * Dates must be "YYYY-MM-DD" strings.
 */
export async function createRental({ postId, startDate, endDate }) {
  const { data } = await apiClient.post("/api/rentals", {
    post_id: postId,
    start_date: startDate,
    end_date: endDate,
  });
  return data;
  // { message, rental: { request_id, post_id, renter_id, start_date, end_date,
  //                       total_price, status, requested_at } }
}

/**
 * GET /api/rentals/my  [Requires Auth: Renter]
 * Get the logged-in renter's rental history.
 */
export async function getMyRentals() {
  const { data } = await apiClient.get("/api/rentals/my");
  return data;
  // [{ request_id, car_title, start_date, end_date, total_price, status, requested_at }]
}

/**
 * GET /api/rentals/:id  [Requires Auth]
 * Get a single rental by ID (accessible by the renter, car owner, or admin).
 */
export async function getRentalById(id) {
  const { data } = await apiClient.get(`/api/rentals/${id}`);
  return data;
  // { request_id, renter_name, car_title, post_id, start_date, end_date,
  //   total_price, status, requested_at, updated_at }
}

/**
 * PATCH /api/rentals/:id/complete  [Requires Auth: CarOwner | Admin]
 * Mark a rental as completed.
 */
export async function completeRental(id) {
  const { data } = await apiClient.patch(`/api/rentals/${id}/complete`);
  return data;
  // { message, request_id, status, car_rental_status? }
}

/**
 * DELETE /api/rentals/:id  [Requires Auth: Renter]
 * Cancel a rental request.
 */
export async function cancelRental(id) {
  const { data } = await apiClient.delete(`/api/rentals/${id}`);
  return data;
  // { message, request_id, status, car_rental_status? }
}
