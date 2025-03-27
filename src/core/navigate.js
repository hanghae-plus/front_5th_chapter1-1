import getRouterMode from "./getRouterMode";
import { render } from "./render";

export default function navigate(pathname) {
  if (getRouterMode() === "hash") {
    history.pushState(null, "", `#/` + pathname.replace(/^\/+/, ""));
    return render();
  }
  history.pushState(null, "", pathname);
  return render();
}
