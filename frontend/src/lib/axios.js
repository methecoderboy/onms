import axios from "axios";

const baseUrl = "https://onms.onrender.com";

export const Axios = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
