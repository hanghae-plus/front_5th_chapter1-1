export const cleanupList = new Map();

export const registerCleanup = (id, callback) => {
  cleanupList.set(id, callback);
};

export const executeCleanup = (id) => {
  const callback = cleanupList.get(id);

  if (!callback) return;

  callback();
  cleanupList.delete(id);
};

export const cleanupAll = () => {
  cleanupList.forEach((callback) => callback());
  cleanupList.clear();
};
