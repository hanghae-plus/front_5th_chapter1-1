import createRouter from "./util/createRouter";

export const router = createRouter();

const params = new URLSearchParams(window.location.search);
const redirectPath = params.get("p");

if (redirectPath) {
  window.history.replaceState(null, "", redirectPath);
}

router.init();
