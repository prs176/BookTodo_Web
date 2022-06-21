import { getCookie } from "../Cookie";

export const getToken = (): string => {
  return getCookie("token") as string;
};
