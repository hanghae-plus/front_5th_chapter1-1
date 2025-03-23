export class Context {
  static #store = {};

  static provide(key, value) {
    Context.#store[key] = value;
  }

  static inject(key) {
    if (!(key in Context.#store)) {
      throw new Error(`"${key}"에 대한 provider가 없습니다.`);
    }
    return Context.#store[key];
  }
}
