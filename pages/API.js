import axios from "axios";
require("dotenv").config();

// const baseURL = process.env.BASE_URL
const baseURL = "http://localhost:3000/api/"

const API = axios.create({
  baseURL: baseURL,
});

export default API;
