class Context {
  constructor(initialState) {
    this.state = initialState;
    this.listeners = new Set();
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    const updatedState = { ...this.state, ...newState };
    if (JSON.stringify(this.state) !== JSON.stringify(updatedState)) {
      this.state = updatedState;
      this.notify();
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((listener) => listener(this.state));
  }
}

export const createContext = (initialState) => new Context(initialState);
