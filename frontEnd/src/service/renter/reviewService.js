import api from "../api";

const reviewService = {
  // POST /api/reviews
  async createReview(payload) {
    try {
      const data = await api.post("/api/reviews", payload);
      return data;
    } catch (error) {
      throw error;
    }
  },

  // GET /api/reviews/my
  async getMyReviews() {
    try {
      const data = await api.get("/api/reviews/my");
      return data;
    } catch (error) {
      throw error;
    }
  },

  // GET /api/renter/reviews
  async getMyRenterReviews() {
    try {
      const data = await api.get("/api/renter/reviews");
      return data;
    } catch (error) {
      throw error;
    }
  },

  // GET /api/reviews/all
  async getAllReviews() {
    try {
      const data = await api.get("/api/reviews/all");
      return data;
    } catch (error) {
      throw error;
    }
  },

  // GET /api/reviews/car/{carPostId}
  async getReviewsByCarPostId(carPostId) {
    try {
      const data = await api.get(`/api/reviews/car/${carPostId}`);
      return data;
    } catch (error) {
      throw error;
    }
  },

  // GET /api/reviews/car/{carPostId}/all
  async getAllCarPostReviews(carPostId) {
    try {
      const data = await api.get(`/api/reviews/car/${carPostId}/all`);
      return data;
    } catch (error) {
      throw error;
    }
  },

  // GET /api/reviews/car/{carPostId}/top
  async getTopCarReviews(carPostId, count = 5) {
    try {
      const data = await api.get(`/api/reviews/car/${carPostId}/top`, {
        params: { count },
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
};

export default reviewService;
