import { getElement } from "./mount.js";

const mountCallbacks = [];

export function defineComponent(component) {
  return {
    render(rootSelector) {
      mountCallbacks.length = 0;

      const html = component();
      const root = getElement(rootSelector);
      root.innerHTML = html;

      if (mountCallbacks.length > 0) {
        mountCallbacks.forEach((fn) => fn());
      }
    },
  };
}

export function onMounted(fn) {
  mountCallbacks.push(fn);
}
