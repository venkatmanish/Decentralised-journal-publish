import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

export const login = async (email, password) => {
  try {
    const response = await api.post("/login", { email, password });
    return response.data;
  } catch (error) {
    throw new Error("Invalid email or password");
  }
};

export const register = async (email, password) => {
  try {
    const response = await api.post("/register", { email, password });
    return response.data;
  } catch (error) {
    throw new Error("Failed to register");
  }
};

export const getManuscripts = async () => {
  try {
    const response = await api.get("/manuscripts");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch manuscripts");
  }
};

export const uploadManuscript = async (manuscriptData) => {
  try {
    const response = await api.post("/manuscripts", manuscriptData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to upload manuscript");
  }
};

// Add more API functions as needed

export default api;
