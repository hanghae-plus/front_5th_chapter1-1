const store = {
  get: (key) => JSON.parse(localStorage.getItem(key)),
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  remove: (key) => localStorage.removeItem(key),
  isLogon: () => !!store.get("user"),
  setUser: (value) => store.set("user", value),
  login: (value) => store.set("user", { username: value, email: "", bio: "" }),
  logout: () => store.remove("user"),
  sync: () => {},
};

export default store;
