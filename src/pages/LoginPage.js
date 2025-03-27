import { userContext } from "../context/userContext";
import { navigateTo } from "../router/navigate";

export const LoginPage = () => {
  const content = `
      <main class="bg-gray-100 flex items-center justify-center min-h-screen">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
          <form id="login-form">
            <div class="mb-4">
              <input type="text" id="username" name="username" placeholder="사용자 이름" class="w-full p-2 border rounded">
            </div>
            <div class="mb-6">
              <input type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
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
      </main>
    `;

  // 렌더링 이후 폼 이벤트 리스너 등록
  setTimeout(() => {
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const usernameInput = document.getElementById("username");
        if (!usernameInput) {
          console.error("사용자 이름 입력 필드를 찾을 수 없습니다.");
          return;
        }
        const username = usernameInput.value;

        if (!username) {
          console.error("사용자 이름이 입력되지 않았습니다.");
          return;
        }

        const userData = {
          username,
          email: "",
          bio: "",
        };

        // 상태 업데이트 → 로컬 스토리지는 subscribe 내부에서 처리됨
        userContext.setState({
          isLoggedIn: true,
          user: userData,
          path: "/profile",
        });

        // 프로필 페이지로 리다이렉트
        navigateTo("/profile");
      });
    }
  }, 0); // 렌더 직후 실행

  return content;
};
