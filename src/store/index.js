const createStore = () => {
  const getStorage = () => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch (e) {
      e;
      return {};
    }
  };

  const state = {};

  const isLogon = () => {
    const tmp = getStorage();
    return !!tmp.username;
  };

  const get = (key) => {
    if (!key) return state;
    else return state?.[key] || undefined;
  };

  const set = (obj) => {
    Object.entries(obj).forEach(([key, value]) => (state[key] = value));
    return state;
  };

  const sync = () => {
    ["user", "users"].forEach((key) => {
      try {
        const local = JSON.stringify(localStorage.getItem(key));
        state[key] = local || null;
      } catch (e) {
        e;
        state[key] = undefined;
      }
    });
  };

  return { isLogon, get, set, sync };
};
const store = globalThis.store || createStore();
globalThis.store = store;
export default store;
