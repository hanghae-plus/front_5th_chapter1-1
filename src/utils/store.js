import { Router } from "./router";

export const store = {
  data: {},
  setData(key, data) {
    this.data[key] = data;
    localStorage.setItem(key, JSON.stringify(data));
    Router.Render();
  },
  getData(key) {
    return JSON.parse(localStorage.getItem(key));
  },
};
