function getLocalStorageItem(key) {
  const item = localStorage.getItem(key);

  if (!item) {
    return null;
  }

  try {
    return JSON.parse(item);
  } catch (error) {
    console.error(error);
    return item;
  }
}

function setLocalStorageItem(key, value) {
  if (typeof value === "object") {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  return localStorage.setItem(key, value);
}

function removeLocalStorageItem(key) {
  return localStorage.removeItem(key);
}

export { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem };
