import { JoinRequest, LoginRequest } from "../../../models/request";
import { MessageResponse, Response } from "../../../models/response";
import { removeCookie, setCookie } from "../../Cookie";
import instance from "../default";

export const join = async (request: JoinRequest): Promise<void> => {
  await instance.post<MessageResponse>("/user/join", request);
  return;
};

export const login = async (request: LoginRequest): Promise<string> => {
  const response = await instance.post<Response<string>>(
    "/user/login",
    request
  );
  removeCookie("token");
  setCookie("token", response.data.response, 24);
  return response.data.response;
};
