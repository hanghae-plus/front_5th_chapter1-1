const createStore = (reducer, initialState, middleware) => {
  const listeners = [];

  let state = initialState;

  const store = {
    state,
    reducer,

    getState: () => state,
    dispatch: (action) => {
      state = reducer(state, action);

      if (middleware) {
        middleware(state, action);
      }

      listeners.forEach((listener) => listener(state));
    },

    subscribe: (listener) => {
      listeners.push(listener);
      listener(state);
    },
  };

  return Object.freeze(store);
};

export default createStore;
