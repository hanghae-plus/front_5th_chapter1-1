const createStore = () => {
  const state = {};

  const get = (key) => {
    if (!key) return state;
    else return state[key];
  };
  const set = (obj) => {
    Object.entries(obj).forEach(([key, value]) => (state[key] = value));
    return state;
  };
  return { get, set };
};
const store = globalThis.store || createStore();
globalThis.store = store;
export default store;
