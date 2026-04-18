import apiClient from "../lib/apiClient";

// ─── Listings ────────────────────────────────────────────────────────────────

/**
 * GET /api/cars/getAll?page=1&pageSize=20  (public)
 * Returns paginated active car listings.
 */
export async function getCars({ page = 1, pageSize = 20 } = {}) {
  const { data } = await apiClient.get("/api/cars/getAll", { params: { page, pageSize } });
  return data;
  // { cars: [{ post_id, title, car_type, brand, model, year, transmission,
  //    location, rental_price, rental_status, owner_name, average_rating }], total, page }
}

/**
 * GET /api/cars/search  (public)
 * Search/filter active listings by type, brand, location, price range.
 */
export async function searchCars({ type, brand, location, minPrice, maxPrice, page = 1, pageSize = 20 } = {}) {
  const { data } = await apiClient.get("/api/cars/search", {
    params: {
      type,
      brand,
      location,
      min_price: minPrice,
      max_price: maxPrice,
      page,
      page_size: pageSize,
    },
  });
  return data;
  // { results: [...], total }
}

/**
 * GET /api/cars/:id  (public)
 * Get single car details including availability and reviews.
 */
export async function getCarById(id) {
  const { data } = await apiClient.get(`/api/cars/${id}`);
  return data;
  // { post_id, owner_name, title, description, car_type, brand, model, year,
  //   transmission, location, rental_price, rental_status, approval_status,
  //   availability: [DateOnly], reviews: [{renter_name, rating, feedback, created_at}], created_at }
}

/**
 * POST /api/cars  [Requires Auth: CarOwner]
 * Body: { title, description?, car_type, brand, model, year, transmission, location, rental_price }
 */
export async function createCar({ title, description, carType, brand, model, year, transmission, location, rentalPrice }) {
  const { data } = await apiClient.post("/api/cars", {
    title,
    description,
    car_type: carType,
    brand,
    model,
    year,
    transmission,
    location,
    rental_price: rentalPrice,
  });
  return data;
  // { message, post: { post_id, title, approval_status, rental_status, created_at } }
}

/**
 * PUT /api/cars/:id  [Requires Auth: CarOwner]
 * Body matches UpdateCarPostRequestDto — only editable fields:
 *   title?, description?, rental_price?, location?, transmission?
 */
export async function updateCar(id, { title, description, transmission, location, rentalPrice }) {
  const { data } = await apiClient.put(`/api/cars/${id}`, {
    title,
    description,
    transmission,
    location,
    rental_price: rentalPrice,
  });
  return data;
  // { message, post: { post_id, title, rental_price, location, updated_at } }
}

/**
 * DELETE /api/cars/:id  [Requires Auth: CarOwner | Admin]
 */
export async function deleteCar(id) {
  const { data } = await apiClient.delete(`/api/cars/${id}`);
  return data;
}

// ─── Availability ─────────────────────────────────────────────────────────────

/**
 * GET /api/cars/:id/availability  (public)
 */
export async function getCarAvailability(id) {
  const { data } = await apiClient.get(`/api/cars/${id}/availability`);
  return data;
}

/**
 * POST /api/cars/:id/availability  [Requires Auth: CarOwner]
 * Body: { dates: [{ date: "YYYY-MM-DD", is_available: bool }] }
 */
export async function setCarAvailability(id, dates) {
  const { data } = await apiClient.post(`/api/cars/${id}/availability`, { dates });
  return data;
}

/**
 * PUT /api/cars/:id/availability  [Requires Auth: CarOwner]
 * Body: { dates: [{ date: "YYYY-MM-DD", is_available: bool }] }
 */
export async function updateCarAvailability(id, dates) {
  const { data } = await apiClient.put(`/api/cars/${id}/availability`, { dates });
  return data;
}

// ─── Images ───────────────────────────────────────────────────────────────────

/**
 * POST /api/cars/:id/images?isPrimary=false  [Requires Auth: CarOwner]
 * Sends multipart/form-data with the image file.
 */
export async function addCarImage(id, imageFile, isPrimary = false) {
  const formData = new FormData();
  formData.append("image", imageFile);
  const { data } = await apiClient.post(`/api/cars/${id}/images`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    params: { isPrimary },
  });
  return data;
  // { image_id, image_url, is_primary, sort_order }
}

/**
 * DELETE /api/cars/:id/images/:imageId  [Requires Auth: CarOwner]
 */
export async function deleteCarImage(carId, imageId) {
  const { data } = await apiClient.delete(`/api/cars/${carId}/images/${imageId}`);
  return data;
}
