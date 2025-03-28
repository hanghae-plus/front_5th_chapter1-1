import { Router, goTo } from "./router";

// 페이지 로드되면 Router() 실행.
document.addEventListener("DOMContentLoaded", () => {
  Router();
});

// 브라우저 뒤로가기, 앞으로가기 버튼 클릭하면 Router() 실행하여 알맞는 페이지 렌더해주기.
window.addEventListener("popstate", () => {
  Router();
});

// a 태그 클릭하면 a태그의 기본동작 막고, goTo() 호출해서 이동.
document.body.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    event.preventDefault();
    const url = event.target.getAttribute("href");
    goTo(url);
  }
});
