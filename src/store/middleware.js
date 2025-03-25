import Store from ".";
import { getLocalItem, removeLocalItem, setLocalItem } from "../utils";
import { ACTION_TYPES, createAction } from "./actions";

const middleware = (state, action) => {
  if (action.type === ACTION_TYPES.SYNC_USER) {
    const user = getLocalItem("user");

    if (user) {
      Store.dispatch(createAction(ACTION_TYPES.SET_USER, user));
    }
  }

  if (action.type !== ACTION_TYPES.SET_USER) return;
  if (action.payload === null) {
    removeLocalItem("user");

    return;
  }

  setLocalItem("user", action.payload);
};

export default middleware;
