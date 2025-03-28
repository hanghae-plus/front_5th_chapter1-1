class Store {
  constructor(storageKey) {
    this.storageKey = storageKey;
  }

  load() {
    return JSON.parse(localStorage.getItem(this.storageKey));
  }

  save(data) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  clear() {
    localStorage.removeItem(this.storageKey);
  }
}

export default Store;
