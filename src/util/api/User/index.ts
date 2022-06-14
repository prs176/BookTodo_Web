import { JoinRequest, LoginRequest } from "../../../models/request";
import { MessageResponse, Response } from "../../../models/response";
import instance from "../Default";

export const join = async (request: JoinRequest): Promise<void> => {
  await instance.post<MessageResponse>("/user/join", request);
  return;
};

export const login = async (request: LoginRequest): Promise<string> => {
  const response = await instance.post<Response<string>>(
    "/user/login",
    request
  );
  return response.data.response;
};
