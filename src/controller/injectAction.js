import { router } from "../utils/route";

// addEvent nav
function init_event() {
  window.addEventListener("click", (e) => {
    const targetId = e.target.id;
    if (targetId === "home") {
      router.navigateTo("/");
    } else if (targetId === "profile") {
      router.navigateTo("/profile");
    } else if (targetId === "login") {
      router.navigateTo("/login");
    } else if (targetId === "logout") {
      window.localStorage.removeItem("userInfo");
      router.navigateTo("/login");
    }
  });
}

export default init_event;
