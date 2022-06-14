import { RecordRequest } from "../../../models/request";
import { RecordData, Response } from "../../../models/response";
import instance from "../Default";

export const applyRecord = async (
  request: RecordRequest
): Promise<RecordData> => {
  const response = await instance.post<Response<RecordData>>(
    "/record",
    request
  );
  return response.data.response;
};

export const fetchRecord = async (month: number): Promise<RecordData[]> => {
  const response = await instance.get<Response<RecordData[]>>(
    `/user/login/${month}`
  );
  return response.data.response;
};
