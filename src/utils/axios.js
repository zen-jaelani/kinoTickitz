import axios from "axios";
import { useNavigate } from "react-router-dom";

const axiosApiIntances = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

// Add a request interceptor
axiosApiIntances.interceptors.request.use(
  function (config) {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    };

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosApiIntances.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 403) {
      if (error.response.data.msg !== "jwt expired") {
        localStorage.clear();
        window.location.href = "/auth/login";
      } else {
        const refreshToken = localStorage.getItem("refreshToken");
        // console.log(refreshToken);
        axiosApiIntances
          .post("auth/refresh", { refreshToken })
          .then((res) => {
            console.log(res.data);
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("refreshToken", res.data.data.newRefreshToken);
            window.location.reload();

            console.log("refresh success");
            console.log(res);
          })
          .catch((err) => {
            localStorage.clear();
            window.location.href = "/auth/login";
            console.log("refresh error");
            console.log(err);
          });
      }
    }
    return Promise.reject(error);
  }
);
export default axiosApiIntances;
