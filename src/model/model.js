export const initialState = {
  path: "/",
  isLoggedIn: false,
  user: null,
  error: null,
};

export const ActionTypes = {
  SET_PATH: "SET_PATH",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  UPDATE_PROFILE: "UPDATE_PROFILE",
  SET_ERROR: "SET_ERROR",
};
