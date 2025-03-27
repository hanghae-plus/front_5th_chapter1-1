export const renderToRoot = (component) => {
  if (component.template) {
    document.getElementById("root").innerHTML = component.template;
    component.init?.();
  } else {
    document.getElementById("root").innerHTML = component;
  }
};
