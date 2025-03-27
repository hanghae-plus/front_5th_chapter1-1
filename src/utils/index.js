export const getLocalItem = (key) => {
  const item = localStorage.getItem(key);

  return item ? JSON.parse(item) : null;
};

export const setLocalItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalItem = (key) => {
  localStorage.removeItem(key);
};

export const getFormValue = (form, type, isPassword = false) =>
  isPassword
    ? form.querySelector(type).value
    : form.querySelector(type).value.trim();
