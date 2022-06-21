import cookies from "js-cookie";

export const getCookie = (key: string): any => {
  return cookies.get(key);
};

export const setCookie = (key: string, value: string, expire: number): void => {
  cookies.set(key, value, { expires: expire });
};

export const removeCookie = (key: string): void => {
  cookies.remove(key);
};
