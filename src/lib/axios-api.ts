import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  validateStatus: (status) => true,
  timeout: 10000,
  withCredentials: true,
});

export { api };
