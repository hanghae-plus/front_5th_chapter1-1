import { ACTION_TYPES } from "./actions";

export const initialState = {
  user: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_USER:
      return { ...state, user: action.payload };

    default:
      return state;
  }
};
