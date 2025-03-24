const createStore = () => {
  const getStorage = () => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch (e) {
      e;
      return {};
    }
  };

  const state = getStorage();

  const isLogon = () => {
    return !!getStorage()?.["username"];
  };

  const get = (key) => {
    const local = getStorage();
    if (!key) return state;
    else return state?.[key] || local?.[key] || undefined;
  };

  const set = (obj) => {
    localStorage.setItem("user", JSON.stringify(obj));
    Object.entries(obj).forEach(([key, value]) => (state[key] = value));
    return state;
  };

  const reset = () => {
    Object.keys(state).forEach((key) => delete state[key]);
    localStorage.removeItem("user");
  };
  return { isLogon, get, set, reset };
};
const store = globalThis.store || createStore();
globalThis.store = store;
export default store;
