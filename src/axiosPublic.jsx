import axios from "axios"

export const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:3002/",
})
