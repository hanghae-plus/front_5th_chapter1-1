const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const setLocalStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

const removeLocalStorage = (key) => {
  return localStorage.removeItem(key);
};

export { getLocalStorage, setLocalStorage, removeLocalStorage };
