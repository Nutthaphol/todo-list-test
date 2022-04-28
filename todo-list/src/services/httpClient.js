import axios from "axios";
import urlJoin from "url-join";
import { isAbsoluteURLRegex } from "./../config";

axios.interceptors.request.use(async (config) => {
  config.url = urlJoin(process.env.REACT_APP_API_URL, config.url);
  config.timeout = 900000;
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(JSON.stringify(error, undefined, 2));
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    } else if (!error.response) {
      alert(JSON.stringify(error));
      return Promise.reject({
        code: "NOT_CONNECT_NETWORK",
        message: "Cannot connect to server, Please try again.",
      });
    }
    return Promise.reject(error);
  }
);

export const httpClient = axios;
