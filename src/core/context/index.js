const store = new Map();

export function provide(key, value) {
  store.set(key, value);
}

export function inject(key) {
  if (!store.has(key)) {
    throw new Error(`"${key}"에 대한 provider가 없습니다.`);
  }
  return store.get(key);
}
