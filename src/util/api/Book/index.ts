import axios, { AxiosError } from "axios";
import { KakaoResponse } from "../../../models/response";

const kakaoBaseURL = "https://dapi.kakao.com/v3/search";

const instance = axios.create({
  baseURL: kakaoBaseURL,
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

export const fetchBook = async (
  query: string,
  page: number
): Promise<KakaoResponse> => {
  const response = await instance.get<KakaoResponse>("/book");
  return response.data;
};
