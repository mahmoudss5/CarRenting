import api from "../api";

const carService = {
  // GET /api/cars
  async getAllCars(params = {}) {
    try {
      const data = await api.get("/api/cars", { params });
      return data;
    } catch (error) {
      throw error;
    }
  },

  // GET /api/cars/search
  async searchCars(params = {}) {
    try {
      const data = await api.get("/api/cars/search", { params });
      return data;
    } catch (error) {
      throw error;
    }
  },

  // GET /api/cars/{id}
  async getCarById(id) {
    try {
      const data = await api.get(`/api/cars/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  },

  // GET /api/cars/{id}/availability
  async getCarAvailability(id) {
    try {
      const data = await api.get(`/api/cars/${id}/availability`);
      return data;
    } catch (error) {
      throw error;
    }
  },

  // GET /api/cars/{id}/reviews
  async getCarReviews(id) {
    try {
      const data = await api.get(`/api/cars/${id}/reviews`);
      return data;
    } catch (error) {
      throw error;
    }
  },
};

export default carService;
