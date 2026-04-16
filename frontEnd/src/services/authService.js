import apiClient from "../lib/apiClient";

/**
 * POST /api/auth/register
 * Body: { full_name, email, password, role }
 * role: "CarOwner" | "Renter"
 */
export async function register({ fullName, email, password, role }) {
  const { data } = await apiClient.post("/api/auth/register", {
    full_name: fullName,
    email,
    password,
    role,
  });
  return data; // { message, user: { user_id, full_name, email, role, status } }
}

/**
 * POST /api/auth/login
 * Body: { email, password }
 */
export async function login({ email, password }) {
  const { data } = await apiClient.post("/api/auth/login", { email, password });
  return data; // { token, user: { user_id, full_name, email, role, status } }
}

/**
 * POST /api/auth/logout  [Requires Auth]
 */
export async function logout() {
  const { data } = await apiClient.post("/api/auth/logout");
  return data; // { message }
}

/**
 * GET /api/auth/me  [Requires Auth]
 */
export async function getMe() {
  const { data } = await apiClient.get("/api/auth/me");
  return data; // { user_id, full_name, email, role, status, created_at }
}

/**
 * PUT /api/auth/me  [Requires Auth]
 * Body: { full_name?, phone_number? }
 */
export async function updateProfile({ fullName, phoneNumber }) {
  const { data } = await apiClient.put("/api/auth/me", {
    full_name: fullName,
    phone_number: phoneNumber,
  });
  return data;
}

/**
 * POST /api/auth/change-password  [Requires Auth]
 * Body: { current_password, new_password }
 */
export async function changePassword({ currentPassword, newPassword }) {
  const { data } = await apiClient.post("/api/auth/change-password", {
    current_password: currentPassword,
    new_password: newPassword,
  });
  return data;
}
