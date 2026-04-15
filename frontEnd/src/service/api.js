const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

function buildUrl(path, params = {}) {
  const url = new URL(`${BASE_URL}${path}`, window.location.origin);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.append(key, value);
    }
  });
  return url.toString();
}

async function request(path, options = {}) {
  const { method = "GET", data, headers = {}, params = {}, isMultipart = false } = options;
  const token = localStorage.getItem("token");

  const requestHeaders = { ...headers };
  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }
  if (!isMultipart) {
    requestHeaders["Content-Type"] = requestHeaders["Content-Type"] || "application/json";
  }

  const config = {
    method,
    headers: requestHeaders,
  };

  if (data !== undefined) {
    config.body = isMultipart ? data : JSON.stringify(data);
  }

  const response = await fetch(buildUrl(path, params), config);

  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  const responseData = await response.json().catch(() => null);

  if (!response.ok) {
    throw {
      status: response.status,
      data: responseData,
      message: responseData?.message || responseData?.error || "Request failed",
    };
  }

  return responseData;
}

const api = {
  get(path, options = {}) {
    return request(path, { ...options, method: "GET" });
  },
  post(path, data, options = {}) {
    return request(path, { ...options, method: "POST", data });
  },
  put(path, data, options = {}) {
    return request(path, { ...options, method: "PUT", data });
  },
  patch(path, data, options = {}) {
    return request(path, { ...options, method: "PATCH", data });
  },
  delete(path, options = {}) {
    return request(path, { ...options, method: "DELETE" });
  },
};

export default api;
