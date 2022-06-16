import { RecordRequest } from "../../../models/request";
import { RecordData, Response } from "../../../models/response";
import instance from "../default";

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
    `/record/${month}`
  );
  return response.data.response;
};
