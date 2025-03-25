import { model } from "../model/model";
import { view } from "../view/view";

export function navigateTo(path) {
  const fullPath = path.startsWith("/") ? path : `/${path}`;

  if (window.location.pathname !== fullPath) {
    window.history.pushState(null, "", fullPath);
  }

  model.setPath(fullPath);
  view(model);
}

export function handlePopState() {
  const currentPath = window.location.pathname;
  model.setPath(currentPath);
  view(model);
}
