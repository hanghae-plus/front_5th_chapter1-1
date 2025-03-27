import { render } from "./router";
import { state } from "./state";

document.addEventListener("click", (event) => {
  console.log("클리 ㄱ이벤트", event, event.target);
  if (event.target && event.target.id === "logout") {
    event.preventDefault();
    console.log("로그아웃");

    state.setIsLoggedIn(false);
    state.setUserInfo(null);

    render();
  }
});

const main = () => {
  render();
};

main();
