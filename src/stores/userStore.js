import createObservableStore from "../utils/store.js";

const userStore = (() => {
  const store = createObservableStore({
    user: JSON.parse(localStorage.getItem("user")),
  });

  const isLoggedIn = () => {
    const { user } = store.getState();

    return Boolean(user);
  };

  return {
    ...store,
    isLoggedIn,
  };
})();

export default userStore;
