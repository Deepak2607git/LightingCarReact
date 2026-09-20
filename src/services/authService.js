const API_URL = import.meta.env.VITE_API_URL;

async function request(path, body) {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed.");
  }

  return data;
}

export async function login(email, password) {
  const data = await request("/api/Auth/login", { email, password });
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data));
  return data;
}

export async function register(fullName, email, password) {
  return request("/api/Auth/register", { fullName, email, password });
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function getCurrentUser() {
  const value = localStorage.getItem("user");
  return value ? JSON.parse(value) : null;
}
