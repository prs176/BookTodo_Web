import axios, { AxiosError } from "axios";
import { getToken } from "../../token/token";
const baseURL = process.env.REACT_APP_BASE_URL;
const kakaoBaseURL = "https://dapi.kakao.com/v3/search";

const instance = axios.create({
  baseURL,
  headers: {
    Authorization: getToken(),
    "Access-Control-Allow-Origin": "*",
  },
});

instance.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error: AxiosError) {
    return Promise.reject(error);
  }
);

export const kakaoInstance = axios.create({
  baseURL: kakaoBaseURL,
  headers: {
    Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`,
  },
});

kakaoInstance.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error: AxiosError) {
    return Promise.reject(error);
  }
);

export default instance;
