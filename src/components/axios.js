import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/",
  withCredentials: true, // This ensures cookies are sent with cross-origin requests
});

export default instance;
