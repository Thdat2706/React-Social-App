import axios from "axios";

const BASE_URL = "http://localhost:8800/api/";

const user = JSON.parse(localStorage.getItem("user"));
const TOKEN = user?.token;
console.log(TOKEN);

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const makeRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
  withCredentials: true,
});

