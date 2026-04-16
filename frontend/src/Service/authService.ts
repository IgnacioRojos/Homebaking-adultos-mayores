const API_URL = import.meta.env.VITE_API_URL;

export const login = async (dni: string, password: string) => {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ dni, password })
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al loguear");
  }

  return res.json();
};