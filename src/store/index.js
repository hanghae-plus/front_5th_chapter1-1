const store = {
  state: {
    username: "",
    email: "",
    bio: "",
  },
  setState(newState) {
    this.state = { ...this.state, ...newState };
    localStorage.setItem("user", JSON.stringify(this.state));
  },
  getState() {
    return JSON.parse(localStorage.getItem("user"));
  },
  deleteState() {
    localStorage.removeItem("user");
    return;
  },
};

export default store;
