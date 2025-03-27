import { createObserver } from "./createObserver";

export const createStore = (initialState) => {
  const { subscribe, notify } = createObserver();

  let state = { ...initialState };

  const setState = (newState) => {
    state = { ...state, ...newState };
    notify();
  };

  const getState = () => ({ ...state });

  return { getState, setState, subscribe };
};
