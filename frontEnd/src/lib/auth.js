const AUTH_KEY = "ds_auth";

export function saveAuth(token, user) {
  sessionStorage.setItem(AUTH_KEY, JSON.stringify({ token, user }));
}

export function getToken() {
  try {
    return JSON.parse(sessionStorage.getItem(AUTH_KEY) ?? "{}").token ?? null;
  } catch {
    return null;
  }
}

export function getUser() {
  try {
    return JSON.parse(sessionStorage.getItem(AUTH_KEY) ?? "{}").user ?? null;
  } catch {
    return null;
  }
}

export function clearAuth() {
  sessionStorage.removeItem(AUTH_KEY);
}

export function authHeaders() {
  const token = getToken();
  return token
    ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    : { "Content-Type": "application/json" };
}
