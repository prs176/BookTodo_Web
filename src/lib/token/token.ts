export const getToken = (): string => {
  const SToken: string | null = sessionStorage.getItem("token");
  return SToken || "";
};
