export const setItem = (key, value) => {
  if (!key || !value) return;
  localStorage.setItem(key, JSON.stringify(value));

  const event = new Event("storage");
  window.dispatchEvent(event);
};

export const getItem = (key) => {
  if (!key) return null;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const removeItem = (key) => {
  if (!key) return;
  localStorage.removeItem(key);

  const event = new Event("storage");
  window.dispatchEvent(event);
};
