const AUTH_KEY = "ds_auth";

export function saveAuth(token, user) {
  const payload = JSON.stringify({ token, user });
  localStorage.setItem(AUTH_KEY, payload);
}

export function getToken() {
  try {
    const stored =
      localStorage.getItem(AUTH_KEY) ??
      sessionStorage.getItem(AUTH_KEY) ??
      "{}";
    return JSON.parse(stored).token ?? null;
  } catch {
    return null;
  }
}

export function getUser() {
  try {
    const stored =
      localStorage.getItem(AUTH_KEY) ??
      sessionStorage.getItem(AUTH_KEY) ??
      "{}";
    return JSON.parse(stored).user ?? null;
  } catch {
    return null;
  }
}

export function clearAuth() {
  sessionStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(AUTH_KEY);
}

export function authHeaders() {
  const token = getToken();
  return token
    ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    : { "Content-Type": "application/json" };
}
