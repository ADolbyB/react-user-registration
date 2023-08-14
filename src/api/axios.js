import axios from "axios";
const BASE_URL = "http://localhost:3500";

export default axios.create({
    baseURL: BASE_URL // Dev Backend will be here (another VS Code Instance)
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL, // Dev Backend will be here (another VS Code Instance)
    headers: { "Content-Type": "application/json" },
    withCredentials: true
});