import { getToken } from "../../lib/auth";

const OWNER_BASE = "/api/owner";
const CARS_BASE = "/api/cars";

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

function isCarRented(car) {
  return String(car?.rentalStatus ?? "").toLowerCase() === "rented";
}

// 1) Owner can accept rental requests
// 2) Accepted request marks car as rented in backend logic
// 5) Verifying driver's license means accepting the request
export async function acceptRentalRequest(requestId) {
  return request(`${OWNER_BASE}/rentals/${requestId}/accept`, { method: "PATCH" });
}

export async function verifyRenterLicense(requestId) {
  return acceptRentalRequest(requestId);
}

// 1) Owner can reject rental requests
export async function rejectRentalRequest(requestId, reason = "Rejected by owner.") {
  return request(`${OWNER_BASE}/rentals/${requestId}/reject`, {
    method: "PATCH",
    body: JSON.stringify({ reason }),
  });
}

export async function getOwnerRentals() {
  const data = await request(`${OWNER_BASE}/rentals`);
  return normalizeArray(data);
}

// 3) Owner can manage car posts (CRUD)
export async function getOwnerCars() {
  const data = await request(`${OWNER_BASE}/cars`);
  return normalizeArray(data);
}

export async function createCarPost(payload) {
  return request(`${CARS_BASE}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateCarPost(carId, payload) {
  return request(`${CARS_BASE}/${carId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

// 4) Owner cannot delete a rented car post
export async function deleteCarPost(carId, knownCars = null) {
  const cars = Array.isArray(knownCars) ? knownCars : await getOwnerCars();
  const car = cars.find((item) => String(item?.postId) === String(carId));

  if (car && isCarRented(car)) {
    throw new Error("This car is currently rented and cannot be deleted.");
  }

  return request(`${CARS_BASE}/${carId}`, { method: "DELETE" });
}

const ownerService = {
  getOwnerRentals,
  acceptRentalRequest,
  rejectRentalRequest,
  verifyRenterLicense,
  getOwnerCars,
  createCarPost,
  updateCarPost,
  deleteCarPost,
};

export default ownerService;
