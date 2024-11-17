import axios from "axios";

const baseUrl = "https://onms.vercel.app/";

export const Axios = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
