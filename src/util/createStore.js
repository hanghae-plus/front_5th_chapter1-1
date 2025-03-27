const createStore = (initialState = {}, persistConfig = {}) => {
  let state = { ...initialState };

  const storageKeys = Object.entries(persistConfig)
    .filter(([, shouldPersist]) => shouldPersist)
    .map(([key]) => key);

  if (storageKeys.length > 0) {
    storageKeys.forEach((storageKey) => {
      const savedValue = JSON.parse(localStorage.getItem(storageKey) ?? null);

      if (savedValue) {
        state[storageKey] = savedValue;
      }
    });
  }

  const setState = (payload) => {
    const newState = { ...state, ...payload };

    const shouldPersistStates = Object.keys(payload).filter(
      (key) => payload[key] !== state[key] && storageKeys.includes(key),
    );

    state = newState;

    if (shouldPersistStates.length > 0) {
      shouldPersistStates.forEach((key) => {
        localStorage.setItem(key, JSON.stringify(payload[key]));
      });
    }
  };

  const getState = (key = null) => {
    if (key) {
      return state[key];
    }

    return { ...state };
  };

  const resetState = ({ clearStorage = false } = {}) => {
    state = { ...initialState };

    if (clearStorage) {
      storageKeys.forEach((storageKey) => {
        localStorage.removeItem(storageKey);
      });
    }
  };

  return {
    getState,
    setState,
    resetState,
  };
};

export default createStore;
