import storage from "../utils/storage";

const createStore = (reducer, initialState = {}) => {
  let state = initialState;
  const listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    notifyListeners();
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listener.splice(index, 1);
      }
    };
  };

  const notifyListeners = () => {
    listeners.forEach((listener) => listener(state));
  };

  return {
    getState,
    dispatch,
    subscribe,
  };
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN": {
      const { username } = payload;
      const user = { username, email: "", bio: "" };
      storage.set("user", user);

      return { ...state, isLoggedIn: true, userInfo: user };
    }
    case "LOGOUT": {
      storage.remove("user");

      return { ...state, isLoggedIn: false, userInfo: {} };
    }
    case "UPDATE_PROFILE": {
      const updateUserInfo = { ...state.userInfo, ...payload };
      storage.set("user", updateUserInfo);

      return { ...state, userInfo: updateUserInfo };
    }
    default:
      return state;
  }
};

const initialState = {
  isLoggedIn: !!storage.get("user"),
  userInfo: JSON.parse(storage.get("user")) || {},
};

const store = createStore(reducer, initialState);

export default store;
