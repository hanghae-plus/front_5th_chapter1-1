import { createContext } from "./context";

export const userContext = createContext({
  path: "/",
  isLoggedIn: false,
  user: null,
  error: null,
});

function syncLocalStorage(state) {
  if (state.isLoggedIn && state.user) {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("isLoggedIn", "true");
  } else {
    localStorage.removeItem("user");
    localStorage.setItem("isLoggedIn", "false");
  }
  localStorage.setItem("path", state.path);
}

userContext.subscribe(syncLocalStorage);
