import { getToken } from "../../lib/auth";

const ADMIN_BASE = "/api/admin";

function getAuthHeaders() {
  const token = getToken();
  return token
    ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    : { "Content-Type": "application/json" };
}

async function safeJsonParse(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...(options.headers ?? {}),
    },
  });

  const data = await safeJsonParse(response);

  if (!response.ok) {
    const message =
      data?.error ||
      data?.message ||
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
}

function normalizeArray(data) {
  return Array.isArray(data) ? data : [];
}

export async function getPendingOwners() {
  const data = await request(`${ADMIN_BASE}/users/pending-owners`);
  return normalizeArray(data);
}

export async function approveOwnerAccount(ownerId) {
  return request(`${ADMIN_BASE}/users/${ownerId}/approve`, { method: "PATCH" });
}

export async function rejectOwnerAccount(
  ownerId,
  reason = "Application rejected by admin.",
) {
  return request(`${ADMIN_BASE}/users/${ownerId}/reject`, {
    method: "PATCH",
    body: JSON.stringify({ reason }),
  });
}

export async function getPendingCarPosts() {
  const data = await request(`${ADMIN_BASE}/cars/pending`);
  return normalizeArray(data);
}

export async function approveCarPost(postId) {
  return request(`${ADMIN_BASE}/cars/${postId}/approve`, { method: "PATCH" });
}

export async function rejectCarPost(postId, reason = "Car post rejected by admin.") {
  return request(`${ADMIN_BASE}/cars/${postId}/reject`, {
    method: "PATCH",
    body: JSON.stringify({ reason }),
  });
}

const adminService = {
  getPendingOwners,
  approveOwnerAccount,
  rejectOwnerAccount,
  getPendingCarPosts,
  approveCarPost,
  rejectCarPost,
};

export default adminService;
