const storage = {
  get(key) {
    const value = localStorage.getItem(key);
    return value;
  },
  set(key, value) {
    localStorage.setItem(
      key,
      typeof value === "object" ? JSON.stringify(value) : value,
    );
  },
  remove(key) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  },
};

export default storage;
