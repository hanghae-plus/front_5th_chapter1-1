import createObservable from "./observable.js";

const createObservableStore = (initialState) => {
  let state = initialState;
  const observable = createObservable();

  const setState = (newState) => {
    state = { ...newState };
    observable.notify(state);
  };

  const getState = () => {
    return state;
  };

  return {
    ...observable,
    setState,
    getState,
  };
};

export default createObservableStore;
