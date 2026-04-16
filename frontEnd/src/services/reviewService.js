import apiClient from "../lib/apiClient";

/**
 * POST /api/reviews  [Requires Auth: Renter]
 * Create a review for a completed rental.
 * Body: { request_id, post_id, rating (1-5), feedback? }
 */
export async function createReview({ requestId, postId, rating, feedback }) {
  const { data } = await apiClient.post("/api/reviews", {
    request_id: requestId,
    post_id: postId,
    rating,
    feedback,
  });
  return data;
  // { message, review: { review_id, post_id, renter_name, rating, feedback, created_at } }
}

/**
 * DELETE /api/reviews/:id  [Requires Auth: Admin]
 * Delete a review by ID.
 */
export async function deleteReview(id) {
  const { data } = await apiClient.delete(`/api/reviews/${id}`);
  return data;
}

/**
 * GET /api/reviews/my  [Requires Auth: Renter]
 * Get reviews written by the logged-in renter.
 */
export async function getMyReviews() {
  const { data } = await apiClient.get("/api/reviews/my");
  return data;
  // [{ review_id, car_title, rating, feedback, created_at }]
}

/**
 * GET /api/reviews/all  [Requires Auth: Admin | CarOwner | Renter]
 * Get all reviews in the system.
 */
export async function getAllReviews() {
  const { data } = await apiClient.get("/api/reviews/all");
  return data;
}

/**
 * GET /api/reviews/car/:carPostId  (public)
 * Get public reviews for a specific car.
 */
export async function getCarReviews(carPostId) {
  const { data } = await apiClient.get(`/api/reviews/car/${carPostId}`);
  return data;
  // { post_id, average_rating, reviews: [{ review_id, renter_name, rating, feedback, created_at }], total }
}

/**
 * GET /api/reviews/car/:carPostId/all  [Requires Auth: Renter | CarOwner | Admin]
 * Get all reviews for a car (including non-public ones).
 */
export async function getAllCarReviews(carPostId) {
  const { data } = await apiClient.get(`/api/reviews/car/${carPostId}/all`);
  return data;
}

/**
 * GET /api/reviews/car/:carPostId/top?count=5  (public)
 * Get top N reviews for a car (by rating).
 */
export async function getTopCarReviews(carPostId, count = 5) {
  const { data } = await apiClient.get(`/api/reviews/car/${carPostId}/top`, {
    params: { count },
  });
  return data;
}
