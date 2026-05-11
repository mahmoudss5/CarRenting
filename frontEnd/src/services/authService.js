import apiClient from "../lib/apiClient";


export async function register({ fullName, email, password, role }) {
  const { data } = await apiClient.post("/api/auth/register", {
    full_name: fullName,
    email,
    password,
    role,
  });
  return data; 
}


export async function login({ email, password }) {
  const { data } = await apiClient.post("/api/auth/login", { email, password });
  return data; 
}
export async function logout() {
  const { data } = await apiClient.post("/api/auth/logout");
  return data; 
}

export async function getMe() {
  const { data } = await apiClient.get("/api/auth/me");
  return data; 
}

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
