import apiClient from "../lib/apiClient";

// ─── Users ────────────────────────────────────────────────────────────────────

/**
 * GET /api/admin/users  [Requires Auth: Admin]
 * Get all users in the system.
 */
export async function getAllUsers() {
  const { data } = await apiClient.get("/api/admin/users");
  return data;
  // [{ user_id, full_name, email, role, status, created_at }]
}

/**
 * GET /api/admin/users/pending-owners  [Requires Auth: Admin]
 * Get car owners awaiting approval.
 */
export async function getPendingOwners() {
  const { data } = await apiClient.get("/api/admin/users/pending-owners");
  return data;
}

/**
 * GET /api/admin/users/:id  [Requires Auth: Admin]
 * Get a single user's details.
 */
export async function getUserById(id) {
  const { data } = await apiClient.get(`/api/admin/users/${id}`);
  return data;
  // { user_id, full_name, email, role, status, phone_number?, is_approved, created_at }
}

/**
 * PATCH /api/admin/users/:id/approve  [Requires Auth: Admin]
 * Approve a user (e.g. a CarOwner awaiting approval).
 */
export async function approveUser(id) {
  const { data } = await apiClient.patch(`/api/admin/users/${id}/approve`);
  return data;
  // { message, user_id, status }
}

/**
 * PATCH /api/admin/users/:id/reject  [Requires Auth: Admin]
 * Reject a user with a reason.
 * Body: { reason }
 */
export async function rejectUser(id, reason) {
  const { data } = await apiClient.patch(`/api/admin/users/${id}/reject`, { reason });
  return data;
  // { message, user_id, status }
}

/**
 * DELETE /api/admin/users/:id  [Requires Auth: Admin]
 * Permanently delete a user.
 */
export async function deleteUser(id) {
  const { data } = await apiClient.delete(`/api/admin/users/${id}`);
  return data;
}

/**
 * PATCH /api/admin/users/:id/promote  [Requires Auth: Admin]
 * Promote a user to Admin role.
 */
export async function promoteToAdmin(id) {
  const { data } = await apiClient.patch(`/api/admin/users/${id}/promote`);
  return data;
}

// ─── Car Posts ────────────────────────────────────────────────────────────────

/**
 * GET /api/admin/cars/pending  [Requires Auth: Admin]
 * Get car posts awaiting approval.
 */
export async function getPendingCars() {
  const { data } = await apiClient.get("/api/admin/cars/pending");
  return data;
  // [{ post_id, owner_name, title, car_type, brand, location, rental_price, created_at }]
}

/**
 * GET /api/admin/cars  [Requires Auth: Admin]
 * Get ALL car posts (any approval status) for the admin overview.
 */
export async function getAdminAllCars() {
  const { data } = await apiClient.get("/api/admin/cars");
  return data;
  // [{ post_id, owner_name, title, car_type, brand, location, rental_price, approval_status, created_at }]
}

/**
 * PATCH /api/admin/cars/:id/approve  [Requires Auth: Admin]
 * Approve a car listing.
 */
export async function approveCar(id) {
  const { data } = await apiClient.patch(`/api/admin/cars/${id}/approve`);
  return data;
  // { message, post_id, approval_status }
}

/**
 * PATCH /api/admin/cars/:id/reject  [Requires Auth: Admin]
 * Reject a car listing with a reason.
 * Body: { reason }
 */
export async function rejectCar(id, reason) {
  const { data } = await apiClient.patch(`/api/admin/cars/${id}/reject`, { reason });
  return data;
  // { message, post_id, approval_status }
}

// ─── Driver Licenses ──────────────────────────────────────────────────────────

/**
 * GET /api/admin/licenses  [Requires Auth: Admin]
 * Get all submitted driver licenses.
 */
export async function getAllLicenses() {
  const { data } = await apiClient.get("/api/admin/licenses");
  return data;
  // [{ license_id, renter_name, license_number, issuing_country,
  //    expiry_date, verification_status, submitted_at }]
}

/**
 * PATCH /api/admin/licenses/:id/verify  [Requires Auth: Admin]
 * Verify (approve) a driver license.
 */
export async function verifyLicense(id) {
  const { data } = await apiClient.patch(`/api/admin/licenses/${id}/verify`);
  return data;
  // { message, license_id, status }
}

/**
 * PATCH /api/admin/licenses/:id/reject  [Requires Auth: Admin]
 * Reject a driver license with a reason.
 * Body: { reason }
 */
export async function rejectLicense(id, reason) {
  const { data } = await apiClient.patch(`/api/admin/licenses/${id}/reject`, { reason });
  return data;
  // { message, license_id, status }
}

// ─── Rentals ─────────────────────────────────────────────────────────────────

/**
 * GET /api/admin/rentals  [Requires Auth: Admin]
 * Get all rentals in the system.
 */
export async function getAllRentals() {
  const { data } = await apiClient.get("/api/admin/rentals");
  return data;
  // [{ request_id, renter_name, car_title, owner_name, start_date, end_date,
  //    total_price, status, requested_at }]
}

// ─── Stats ────────────────────────────────────────────────────────────────────

/**
 * GET /api/admin/stats  [Requires Auth: Admin]
 * Get dashboard statistics.
 */
export async function getAdminStats() {
  const { data } = await apiClient.get("/api/admin/stats");
  return data;
}
