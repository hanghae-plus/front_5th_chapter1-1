export const getData = (key, defaultValue) => {
  try {
    const todo = window.localStorage.getItem(key);
    return todo ? JSON.parse(todo) : defaultValue;
  } catch (e) {
    console.log(e);
    return defaultValue;
  }
};

export const setData = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

export const removeData = (key) => {
  try {
    window.localStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};
