class Store {
  constructor() {
    this.state = new Map(); // state를 Map으로 초기화
    this.listeners = new Map(); // listeners를 Map으로 초기화
  }

  getState(key) {
    return this.state.has(key) ? this.state.get(key) : null;
  }

  setState(key, newState) {
    const prevState = this.state.get(key);

    this.state.set(key, newState);
    this.notify(key);

    if (prevState === newState) {
      return;
    }

    this.notify(key);
  }

  subscribe(key, listener) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, []);
    }
    this.listeners.get(key).push(listener);
  }

  notify(key) {
    if (this.listeners.has(key)) {
      this.listeners.get(key).forEach((listener) => listener());
    }
  }
}

const store = new Store();

export default store;
