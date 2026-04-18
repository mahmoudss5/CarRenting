import apiClient from "../lib/apiClient";

/**
 * POST /api/rentals  [Requires Auth: Renter]
 * Body: { post_id, start_date, end_date }
 */
export async function createRental({ postId, startDate, endDate }) {
  const { data } = await apiClient.post("/api/rentals", {
    post_id: postId,
    start_date: startDate,
    end_date: endDate,
  });
  return data;
}

/**
 * GET /api/rentals/:id  [Requires Auth]
 */
export async function getRentalById(id) {
  const { data } = await apiClient.get(`/api/rentals/${id}`);
  return data;
}

/**
 * GET /api/rentals/my  [Requires Auth: Renter]
 */
export async function getMyRentals() {
  const { data } = await apiClient.get("/api/rentals/my");
  return data;
}

/**
 * PATCH /api/rentals/:id/complete  [Requires Auth: CarOwner | Admin]
 */
export async function completeRental(id) {
  const { data } = await apiClient.patch(`/api/rentals/${id}/complete`);
  return data;
}

/**
 * DELETE /api/rentals/:id  [Requires Auth: Renter]
 */
export async function cancelRental(id) {
  const { data } = await apiClient.delete(`/api/rentals/${id}`);
  return data;
}
