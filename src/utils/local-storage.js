export const getStoreValue = (key) => {
  const value = localStorage.getItem(key);

  if (value === null) return null;

  return JSON.parse(value);
};

export const setStoreValue = (key, value) => {
  if (value === null) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeStoreValue = (key) => {
  const value = getStoreValue(key);

  if (value === null) return;

  localStorage.removeItem(key);
};
