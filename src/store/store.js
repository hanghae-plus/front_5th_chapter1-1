import { initialState, ActionTypes } from "../model/model";

class Store {
  constructor() {
    this.state = initialState;
    this.listeners = new Set();

    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        this.state = {
          ...this.state,
          isLoggedIn: true,
          user: user,
        };
      } catch (e) {
        console.error("Failed to parse user data:", e);
        localStorage.removeItem("user");
      }
    }
  }

  getState() {
    return this.state;
  }

  dispatch(action) {
    switch (action.type) {
      case ActionTypes.SET_PATH:
        this.state = {
          ...this.state,
          path: action.payload,
        };
        break;

      case ActionTypes.LOGIN:
        localStorage.setItem("user", JSON.stringify(action.payload));
        this.state = {
          ...this.state,
          isLoggedIn: true,
          user: action.payload,
          error: null,
        };
        break;

      case ActionTypes.LOGOUT:
        localStorage.removeItem("user");
        this.state = {
          ...this.state,
          isLoggedIn: false,
          user: null,
        };
        break;

      case ActionTypes.UPDATE_PROFILE: {
        const updatedUser = {
          ...this.state.user,
          ...action.payload,
        };

        if (!updatedUser.bio) {
          updatedUser.bio = this.state.user?.bio || "";
        }

        localStorage.setItem("user", JSON.stringify(updatedUser));
        this.state = {
          ...this.state,
          user: updatedUser,
        };
        break;
      }

      case ActionTypes.SET_ERROR:
        this.state = {
          ...this.state,
          error: action.payload,
        };
        break;
    }

    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }
}

export const actions = {
  setPath: (path) => ({
    type: ActionTypes.SET_PATH,
    payload: path,
  }),

  login: (userData) => ({
    type: ActionTypes.LOGIN,
    payload: userData,
  }),

  logout: () => ({
    type: ActionTypes.LOGOUT,
  }),

  updateProfile: (profileData) => ({
    type: ActionTypes.UPDATE_PROFILE,
    payload: profileData,
  }),

  setError: (error) => ({
    type: ActionTypes.SET_ERROR,
    payload: error,
  }),
};

export function navigateTo(dispatch, path) {
  const fullPath = path.startsWith("/") ? path : `/${path}`;

  if (window.location.pathname !== fullPath) {
    window.history.pushState(null, "", fullPath);
  }

  dispatch(actions.setPath(fullPath));
}

export function handlePopState(dispatch) {
  const currentPath = window.location.pathname;
  dispatch(actions.setPath(currentPath));
}

export const store = new Store();
