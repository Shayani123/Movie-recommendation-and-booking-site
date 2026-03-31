import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:5175/api",
    withCredentials : true,
});

export default api;