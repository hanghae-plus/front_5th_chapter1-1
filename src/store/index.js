const createStore = () => {
  const local = localStorage.getItem("profile");
  let tmp = {};
  try {
    tmp = JSON.parse(local);
  } catch (e) {
    console.log(e);
  }

  const state = { username: "", profile: tmp };

  const get = (key) => {
    if (key && typeof state[key] !== "undefined") return state[key];
    else state;
  };
  const set = (obj) => {
    Object.entries(obj).forEach(([key, value]) => (state[key] = value));
    return state;
  };
  const setLocalProfile = (profile) => {
    localStorage.setItem("profile", JSON.stringify(profile));
    set({ profile });
    return state;
  };
  return { state, get, set, setLocalProfile };
};
const store = globalThis.store || createStore();
globalThis.store = store;
export default store;
