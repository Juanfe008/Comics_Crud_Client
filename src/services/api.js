import axios from "axios";

// Configuración base de Axios
const api = axios.create({
  baseURL: "http://localhost:8000", // URL de tu servidor FastAPI
  headers: {
    "Content-Type": "application/json",
  },
});

// Funciones para interactuar con la API
export const getComics = () => api.get("/comics");
export const getComic = (id) => api.get(`/comics/${id}`);
export const createComic = (comic) => api.post("/comics", comic);
export const updateComic = (id, comic) => api.put(`/comics/${id}`, comic);
export const deleteComic = (id) => api.delete(`/comics/${id}`);

export default api;