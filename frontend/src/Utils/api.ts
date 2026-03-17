const API_URL = import.meta.env.VITE_API_URL;

export const api = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error en la petición");
  }

  return res.json();
};