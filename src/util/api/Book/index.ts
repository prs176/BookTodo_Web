import { BookRequest } from "../../../models/request";
import {
  BookData,
  BookRecordData,
  MessageResponse,
  Response,
} from "../../../models/response";
import instance from "../Default";

export const applyMyBook = async (request: BookRequest): Promise<BookData> => {
  const response = await instance.post<Response<BookData>>("/book", request);
  return response.data.response;
};

export const fetchMyBook = async (): Promise<BookRecordData[]> => {
  const response = await instance.get<Response<BookRecordData[]>>("/book");
  return response.data.response;
};

export const fetchMyBookByIsbn = async (
  isbn: string
): Promise<BookRecordData> => {
  const response = await instance.get<Response<BookRecordData>>(
    `/book/${isbn}`
  );
  return response.data.response;
};

export const deleteMyBookByIsbn = async (isbn: string): Promise<void> => {
  await instance.get<Response<MessageResponse>>(`/book/${isbn}`);
  return;
};
