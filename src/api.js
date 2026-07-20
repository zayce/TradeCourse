// Базовый адрес бэкенда.
// Для Vite: положи в .env файл фронтенда строку VITE_API_URL=http://localhost:8000
// Для Create React App: REACT_APP_API_URL=http://localhost:8000
const API_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  (typeof process !== "undefined" && process.env?.REACT_APP_API_URL) ||
  "http://localhost:8000";

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    // тело может быть пустым
  }

  if (!res.ok) {
    const message = data?.detail || data?.message || "Что-то пошло не так";
    throw new Error(message);
  }

  return data;
}

export const authApi = {
  register: ({ name, email, password }) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    }),

  login: ({ email, password }) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  verifyEmail: (token) =>
    request(`/auth/verify-email?token=${encodeURIComponent(token)}`),

  resendVerification: (email) =>
    request("/auth/resend-verification", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),
};
