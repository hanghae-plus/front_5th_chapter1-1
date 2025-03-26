const mountCallbacks = [];

export function defineComponent(component) {
  return {
    render(rootSelector) {
      mountCallbacks.length = 0;

      const html = component();
      const root =
        typeof rootSelector === "string"
          ? document.querySelector(rootSelector)
          : rootSelector;
      root.innerHTML = html;

      mountCallbacks.forEach((fn) => fn());
    },
  };
}

export function onMounted(fn) {
  mountCallbacks.push(fn);
}
