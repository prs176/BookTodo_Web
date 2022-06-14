import { getCookie } from "../Cookie";

export const getToken = (): string => {
  const SToken: string | null = sessionStorage.getItem("token");
  if (SToken) {
    return SToken;
  } else {
    return getCookie("token") as string;
  }
};
