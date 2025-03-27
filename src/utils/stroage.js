function getLocalStorageItem(key) {
  const value = localStorage.getItem(key);
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function setLocalStorageItem(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}

function removeLocalStorageItem(key) {
  return localStorage.removeItem(key);
}

export { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem };
