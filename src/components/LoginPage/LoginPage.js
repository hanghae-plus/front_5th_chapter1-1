import { ID } from "@/constant.js";
import { userInfo } from "@/main.js";

const LoginForm = () => {
  return `
  <div>
   <form id=${ID.LOGIN_FORM}>
        <div class="mb-4">
          <input type="text" id="username"  name="username" placeholder="사용자 이름" class="w-full p-2 border rounded">
      
        <div class="mb-6">
          <input type="password" id="password" name="password" placeholder="비밀번호" class="w-full p-2 border rounded">
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
      
      </form>
      <div class="mt-4 text-center">
        <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
      </div>
      <hr class="my-6">
      <div class="text-center">
        <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
      </div>
      </div>
  `;
};

const LogoutButton = () => {
  return `
   <button id=${ID.LOGOUT_BUTTON} class="w-full mt-4 bg-blue-600 text-white p-2 rounded font-bold">로그아웃</button>
  `;
};

export const LoginPage = () => {
  // const loggedInUserInfo = getUserInfoFromStorage();
  const loggedInUserInfo = userInfo;

  return `
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
      ${loggedInUserInfo ? LogoutButton() : LoginForm()}
    </div>
  </main>
`;
};
