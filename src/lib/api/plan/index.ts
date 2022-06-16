import { PlanRequest } from "../../../models/request";
import { PlanData, Response } from "../../../models/response";
import instance from "../default";

export const applyPlan = async (request: PlanRequest): Promise<PlanData[]> => {
  const response = await instance.post<Response<PlanData[]>>("/plan", request);
  return response.data.response;
};

export const fetchPlan = async (): Promise<PlanData[]> => {
  const response = await instance.get<Response<PlanData[]>>("/plan");
  return response.data.response;
};
