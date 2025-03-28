export const store = {
  get(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  set(key, value) {
    return localStorage.setItem(key, value);
  },
  remove(key) {
    return localStorage.removeItem(key);
  },
};
