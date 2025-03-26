import { App } from "./router";

export const store = {
  data: {},
  setData(key, data) {
    this.data[key] = data;
    localStorage.setItem(key, JSON.stringify(data));
    App.Render();
  },
  getData(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  removeData(key) {
    localStorage.removeItem(key);
    App.Render();
  },
};
