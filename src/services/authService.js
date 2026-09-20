const API_URL = import.meta.env.VITE_API_URL;

export async function login(email, password) {
  const response = await fetch(`${API_URL}/api/Auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || data.title || "Invalid email or password"
    );
  }

  // If backend returns a token
  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  // If your API returns { user: {...}, token: "..." }
  if (data.user) {
    return data.user;
  }

  // If your API directly returns the user
  return data;
}