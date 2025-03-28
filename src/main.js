import routes from "./routes.js";
import HashRouter from "./HashRouter.js";
import LoginStore from "./stores/LoginStore.js";
const BASE_URL = import.meta.env.VITE_BASE_URL ?? "";

function main() {
  const loginStore = new LoginStore();
  const router = new HashRouter(routes, loginStore, BASE_URL);
  router.init();

  // button click 이벤트 감지하기
  window.addEventListener("click", (e) => {
    const targetButton = e.target;
    if (targetButton) {
      if (targetButton.dataset.path == null) {
        return;
      }

      if (targetButton.id === "login") {
        return;
      }

      if (targetButton.id === "logout") {
        loginStore.setUserInfo(null);
      }

      router.navigate(targetButton.dataset.path);
    }
  });

  // form 제출 이벤트 감지하기
  window.addEventListener("submit", (e) => {
    if (e.target.id === "login-form") {
      const formElements = e.target.elements;
      loginStore.setUserInfo({
        username: formElements.username.value,
        email: "",
        bio: "",
      });
      router.navigate("/");
    }

    if (e.target.id === "profile-form") {
      const formElements = e.target.elements;
      loginStore.setUserInfo({
        username: formElements.username.value,
        email: formElements.email.value,
        bio: formElements.bio.value,
      });
      router.navigate("");
    }
  });
}

main();
