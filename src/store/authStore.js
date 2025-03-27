import createStore from "../util/createStore";

const initialState = {
  user: null,
  isLoggedIn: false,
};

const persistConfig = {
  user: true,
  isLoggedIn: false,
};

const authStore = createStore(initialState, persistConfig);

const login = ({ username, email = "", bio = "" }) => {
  authStore.setState({
    user: { username, email, bio },
    isLoggedIn: true,
  });
};

const logout = () => {
  authStore.resetState({ clearStorage: true });
};

const updateUser = ({ username, email = "", bio = "" }) => {
  authStore.setState({
    user: { username, email, bio },
  });
};

export { authStore, login, logout, updateUser };
