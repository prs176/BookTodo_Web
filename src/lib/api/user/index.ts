import { JoinRequest, LoginRequest } from "../../../models/request";
import { MessageResponse, Response } from "../../../models/response";
import instance from "../default";

export const join = async (request: JoinRequest): Promise<void> => {
  await instance.post<MessageResponse>("/user/join", request);
  return;
};

export const login = async (request: LoginRequest): Promise<string> => {
  const { data } = await instance.post<Response<string>>(
    "/user/login",
    request
  );
  sessionStorage.removeItem("token");
  sessionStorage.setItem("token", data.response);
  return data.response;
};

export const fetchGoal = async (): Promise<number> => {
  const { data } = await instance.get<Response<number>>("/user/");
  return data.response;
};

export const modifyGoal = async (goal: number): Promise<number> => {
  const { data } = await instance.put<Response<number>>(`/user/${goal}`);
  return data.response;
};
