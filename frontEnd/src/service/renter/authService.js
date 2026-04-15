import api from "../api";

const authService = {
  // POST /api/auth/register
  async register(payload) {
    try {
      const data = await api.post("/api/auth/register", payload);
      return data;
    } catch (error) {
      throw error;
    }
  },

  // POST /api/auth/login
  async login(payload) {
    try {
      const data = await api.post("/api/auth/login", payload);
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      throw error;
    }
  },

  // POST /api/auth/logout
  async logout() {
    try {
      const data = await api.post("/api/auth/logout");
      return data;
    } catch (error) {
      throw error;
    }
  },

  // GET /api/auth/me
  async getMe() {
    try {
      const data = await api.get("/api/auth/me");
      return data;
    } catch (error) {
      throw error;
    }
  },

  // PUT /api/auth/me
  async updateProfile(payload) {
    try {
      const data = await api.put("/api/auth/me", payload);
      return data;
    } catch (error) {
      throw error;
    }
  },

  // POST /api/auth/change-password
  async changePassword(payload) {
    try {
      const data = await api.post("/api/auth/change-password", payload);
      return data;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
