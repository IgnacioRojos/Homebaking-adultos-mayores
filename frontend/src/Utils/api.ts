const API_URL = import.meta.env.VITE_API_URL;

export const api = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {})
    }
   
  });


  const text = await res.text();

  try {
    const data = JSON.parse(text);

    if (!res.ok) {
      throw new Error(data.message || "Error en la petición");
    }

    return data;
  } catch {
    console.error("Respuesta no JSON:", text);
    throw new Error("Error del servidor");
  }
};