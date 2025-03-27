export const ACTION_TYPES = {
  SET_USER: "SET_USER",
  SYNC_USER: "SYNC_USER",
};

export const createAction = (type, payload) => ({ type, payload });
