const Store = {
  state: {
    user: JSON.parse(localStorage.getItem("user")),
    isLoggedIn: !!localStorage.getItem("user"),
  },

  listeners: [],

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  },

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

    this.listeners.forEach((listener) => listener(this.state));
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
