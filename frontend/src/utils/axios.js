import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost/ScandiwebMvc",
  headers: {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    "Content-Type": "application/json",
  },
});

export default instance;
