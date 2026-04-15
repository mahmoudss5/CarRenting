import api from "../api";

const licenseService = {
  // POST /api/renter/license
  async submitLicense(payload) {
    try {
      const data = await api.post("/api/renter/license", payload);
      return data;
    } catch (error) {
      throw error;
    }
  },

  // POST /api/renter/license/images
  async uploadLicenseImages(frontImage, backImage) {
    try {
      const formData = new FormData();
      formData.append("front_image", frontImage);
      formData.append("back_image", backImage);

      const data = await api.post("/api/renter/license/images", formData, {
        isMultipart: true,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },

  // GET /api/renter/license
  async getMyLicense() {
    try {
      const data = await api.get("/api/renter/license");
      return data;
    } catch (error) {
      throw error;
    }
  },
};

export default licenseService;
