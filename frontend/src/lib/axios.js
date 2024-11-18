import axios from "axios";

const baseUrl = "http://localhost:3000";

export const Axios = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
