import axios from "axios";

import Keys from "@/config/keys";

import Cookies from "universal-cookie";

const cookies = new Cookies();

const http = axios.create({ baseURL: Keys.API_BASE_URL });

http.interceptors.request.use(
  async (config) => {
    const access_token = cookies.get("access_token");

    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  async (error) => {
    // Handle request error
    return await Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  async (error) => {
    // Handle response error
    return await Promise.reject(error);
  }
);

export default http;
