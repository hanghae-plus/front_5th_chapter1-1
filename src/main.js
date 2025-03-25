import ErrorPage from "./pages/ErrorPage";
import handleRouting from "./router/routes";

function navigateTo(url) {
  history.pushState("", null, url); // URL 변경(새로고침 없이). ㅇㅣ거만 단독 적용하면 url만 바뀌고 페이지 변경은 안됨
  render();
}

// 로그아웃 관련 함수
function logout() {
  localStorage.clear();
}

window.addEventListener("popstate", () => {
  render();
});

// 화면에 어떻게 표시될지를 정의하는 함수
const render = () => {
  const path = window.location.pathname;
  // render함수 안에 routes모듈 불러옴
  const content = handleRouting(path);

  // routes값에 정의되어 있지 않은 url값이 들어올 때
  if (content === undefined) {
    document.getElementById("root").innerHTML = `${ErrorPage()}`;
  } else {
    document.getElementById("root").innerHTML = content;
  }
};

render();

// 이벤트 위임을 해줘서 한번만 등록 시 사라지지 않음
document.body.addEventListener("click", (e) => {
  // submit 버튼인 경우 무시
  // submit 버튼 클릭 시 이벤트 버블링? 때문에 click이벤트가 먼저 실행되어버림
  if (e.target.type === "submit") {
    return;
  }
  e.preventDefault();
  // nav태그 안
  if (e.target.closest("nav")) {
    if (e.target.href !== undefined) {
      const url = new URL(e.target.href);
      const path = url.pathname;

      if (e.target.id === "logout") {
        logout();
      }

      if (e.target.tagName === "A") {
        const listItems = document.querySelectorAll("nav ul li a");
        // console.log(listItems);
        listItems.forEach((item) => {
          item.classList.add("bg-blue");
        });
      }
      navigateTo(path);
    }
  }
});

document.body.addEventListener("submit", (e) => {
  e.preventDefault(); // 폼 제출 기본 동작 막기
  // 로그인 폼 submit
  if (e.target.id === "login-form") {
    // e.preventDefault();
    const formData = new FormData(e.target); // 폼 데이터 가져오기

    const user = {};
    user.username = formData.get("username");
    user.email = "";
    user.bio = "";

    // LocalStorage에 유저 데이터 저장
    localStorage.setItem("user", JSON.stringify(user));

    // 로그인 성공 시 바로 상태를 업데이트 해야 됨.
    navigateTo("/profile");
  } else if (e.target.id === "profile-form") {
    const user = JSON.parse(localStorage.getItem("user"));
    const formData = new FormData(e.target); // 폼 데이터 가져오기

    if (formData) {
      user.email = formData.get("email");
      user.bio = formData.get("bio");
    }
    // 유저 프로필 정보 localStorage에 저장
    localStorage.setItem("user", JSON.stringify(user));
    alert("프로필 정보가 수정되었습니다. ");
    navigateTo("/profile");
  }
});

/*
document.body.innerHTML = `
  ${MainPage()}
  ${ProfilePage()}
  ${LoginPage()}
  ${ErrorPage()}
`;
*/
