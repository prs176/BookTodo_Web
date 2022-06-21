import { MyBookRequest } from "../../../models/request";
import {
  MyBookData,
  MyBookRecordData,
  MessageResponse,
  Response,
} from "../../../models/response";
import { getToken } from "../../token/token";
import instance from "../default";

export const applyMyBook = async (
  request: MyBookRequest
): Promise<MyBookData> => {
  const response = await instance.post<Response<MyBookData>>("/book", request);
  return response.data.response;
};

export const fetchMyBook = async (): Promise<MyBookRecordData[]> => {
  const response = await instance.get<Response<MyBookRecordData[]>>("/book", {
    headers: { Authorization: getToken() },
  });
  return response.data.response;
};

export const fetchMyBookByIsbn = async (
  isbn: string
): Promise<MyBookRecordData> => {
  const response = await instance.get<Response<MyBookRecordData>>(
    `/book/${isbn}`
  );
  return response.data.response;
};

export const deleteMyBookByIsbn = async (isbn: string): Promise<void> => {
  await instance.delete<Response<MessageResponse>>(`/book/${isbn}`);
  return;
};
