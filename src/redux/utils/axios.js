// This file contains the axios instance with interceptors for handling JWT tokens
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
