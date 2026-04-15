import api from "../api";

const rentalService = {
  // POST /api/rentals
  async createRental(payload) {
    try {
      const data = await api.post("/api/rentals", payload);
      return data;
    } catch (error) {
      throw error;
    }
  },

  // GET /api/rentals/my
  async getMyRentals() {
    try {
      const data = await api.get("/api/rentals/my");
      return data;
    } catch (error) {
      throw error;
    }
  },

  // GET /api/rentals/{id}
  async getRentalById(id) {
    try {
      const data = await api.get(`/api/rentals/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  },

  // DELETE /api/rentals/{id}
  async cancelRental(id) {
    try {
      const data = await api.delete(`/api/rentals/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  },
};

export default rentalService;
