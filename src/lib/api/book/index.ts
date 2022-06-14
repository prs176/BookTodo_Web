import { KakaoResponse } from "../../../models/response";
import { kakaoInstance } from "../default";

export const fetchBook = async (
  query: string,
  page: number
): Promise<KakaoResponse> => {
  const response = await kakaoInstance.get<KakaoResponse>("/book");
  return response.data;
};
