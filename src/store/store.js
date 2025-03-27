const Store = {
  state: {
    user: JSON.parse(localStorage.getItem("user")),
    isLoggedIn: !!localStorage.getItem("user"),
  },

  listeners: [],

  getState() {
    return this.state;
  },

  setState(partialState) {
    this.state = {
      ...this.state,
      ...partialState,
    };

    if (partialState.user) {
      localStorage.setItem("user", JSON.stringify(this.state.user));
    }
  },

  actions: {
    login: (username, email) => {
      Store.setState({
        user: {
          ...Store.state.user,
          username,
          email,
          bio: "",
        },
        isLoggedIn: true,
      });
    },

    logout: () => {
      localStorage.removeItem("user");

      Store.setState({
        isLoggedIn: false,
      });

      Store.state.user = {
        username: "",
        email: "",
        bio: "",
      };
    },

    updateProfile: (userData) => {
      Store.setState({
        user: {
          ...Store.state.user,
          ...userData,
        },
      });
    },
  },
};

export default Store;
