import { PlanRequest } from "../../../models/request";
import { PlanData, Response } from "../../../models/response";
import instance from "../default";

export const applyPlan = async (
  request: PlanRequest,
  token?: string
): Promise<PlanData[]> => {
  let config = {};
  if (token) {
    config = {
      headers: { Authorization: token },
    };
  }
  const response = await instance.post<Response<PlanData[]>>(
    "/plan",
    request,
    config
  );
  return response.data.response;
};

export const fetchPlan = async (): Promise<PlanData[]> => {
  const response = await instance.get<Response<PlanData[]>>("/plan");
  return response.data.response;
};
