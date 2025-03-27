// import { render as hashRender } from "./main.hash.js";
// import { render as historyRender } from "./main.js";
// import { state } from "./state/state.js";

export const handleProfileSubmit = (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const bio = document.getElementById("bio").value;

  console.log(username, email, bio);

  localStorage.setItem("user", JSON.stringify({ username, email, bio }));

  alert("프로필이 업데이트 되었습니다.");
};

// export const handleLogout = () => {
//   // 로컬 스토리지에서 사용자 정보 삭제
//   localStorage.removeItem("user");
//   state.loggedIn = false; // 로그아웃 상태로 변경

//   // 현재 라우팅 방식 확인
//   const isHashRouting = window.location.hash !== "";

//   // 라우팅 방식에 맞게 처리
//   if (isHashRouting) {
//     // Hash 라우팅 방식일 경우
//     location.hash = "#/login";
//     hashRender();
//   } else {
//     // History API 라우팅 방식일 경우
//     history.pushState(null, null, "/login");
//     historyRender();
//   }
// };
