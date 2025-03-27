import { createStore } from "../lib";
import { userStorage } from "../storage";

export const store = createStore({
  user: userStorage.get(),
  loggedIn: Boolean(userStorage.get()),
});
