import { MyBookRequest } from "../../../models/request";
import {
  MyBookData,
  MyBookRecordData,
  MessageResponse,
  Response,
} from "../../../models/response";
import instance from "../Default";

export const applyMyBook = async (
  request: MyBookRequest
): Promise<MyBookData> => {
  const response = await instance.post<Response<MyBookData>>("/book", request);
  return response.data.response;
};

export const fetchMyBook = async (): Promise<MyBookRecordData[]> => {
  const response = await instance.get<Response<MyBookRecordData[]>>("/book");
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
  await instance.get<Response<MessageResponse>>(`/book/${isbn}`);
  return;
};
