import getRouterMode from "./getRouterMode";
import { render } from "./render";

export default function navigate(pathname) {
  let newPathName =
    getRouterMode() === "hash" ? pathname.replace(/^\/+/, "") : pathname;
  history.pushState(null, "", newPathName);
  return render();
}
