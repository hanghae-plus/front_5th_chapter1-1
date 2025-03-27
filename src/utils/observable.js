const createObservable = () => {
  const observers = new Set();

  const subscribe = (observer) => {
    observers.add(observer);
  };

  const unsubscribe = (observer) => {
    observers.delete(observer);
  };

  const notify = (data) => {
    observers.forEach((observer) => observer(data));
  };

  return {
    subscribe,
    unsubscribe,
    notify,
  };
};

export default createObservable;
