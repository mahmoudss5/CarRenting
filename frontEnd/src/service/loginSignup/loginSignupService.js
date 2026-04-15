import api from "../api";

const loginSignupService = {
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

  // POST /api/auth/register
  async signup(payload) {
    try {
      const data = await api.post("/api/auth/register", payload);
      return data;
    } catch (error) {
      throw error;
    }
  },
};

export default loginSignupService;
