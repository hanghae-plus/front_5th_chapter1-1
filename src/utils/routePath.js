import { BASE_PATH } from "../router/routes";

export const addBasePath = (path) => BASE_PATH + path;
export const removeBasePath = (path) => path.replace(BASE_PATH, "");
