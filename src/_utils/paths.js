import { ENV } from "../environments.js";

export const createPath = (path) => {
  return `${ENV.basePath}${path}`;
};

export const normalizePath = (path) => {
  return path.replace(ENV.basePath, "") || "/";
};
