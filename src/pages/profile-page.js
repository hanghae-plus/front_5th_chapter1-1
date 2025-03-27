import router from "../router";
import hashRouter from "../hashRouter";
import Header from "@/layout/header";
import Footer from "@/layout/footer";
import LoginPage from "./login-page";

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!user;

  if (!isLoggedIn) {
    const hash = window.location.hash;
    if (hash) {
      hashRouter.navigateTo("#/login");
    } else {
      router.navigateTo("/login");
    }
    return LoginPage(); // TODO: navigation 이상 처리 보완
  }

  // setTimeout: DOM이 body에 들어간 후 이벤트를 바인딩하는 것을 보장
  // e2e 테스트용?
  setTimeout(() => {
    const form = document.getElementById("profile-form");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      if (e.target.id === "profile-form") {
        e.preventDefault(); // 폼 제출 시 새로고침 방지
        const usernameInput = document.getElementById("username").value;
        const emailInput = document.getElementById("email").value;
        const bioInput = document.getElementById("bio").value;
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: usernameInput,
            email: emailInput,
            bio: bioInput,
          }),
        );
      }
    });
  }, 0);

  return /* HTML */ `
    <div>
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          ${Header()}
          <main class="p-4">
            <div class="bg-white p-8 rounded-lg shadow-md">
              <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
                내 프로필
              </h2>
              <form id="profile-form">
                <div class="mb-4">
                  <label
                    for="username"
                    class="block text-gray-700 text-sm font-bold mb-2"
                    >사용자 이름</label
                  >
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value="${user?.username}"
                    class="w-full p-2 border rounded"
                  />
                </div>
                <div class="mb-4">
                  <label
                    for="email"
                    class="block text-gray-700 text-sm font-bold mb-2"
                    >이메일</label
                  >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value="${user?.email}"
                    class="w-full p-2 border rounded"
                  />
                </div>
                <div class="mb-6">
                  <label
                    for="bio"
                    class="block text-gray-700 text-sm font-bold mb-2"
                    >자기소개</label
                  >
                  <textarea
                    id="bio"
                    name="bio"
                    rows="4"
                    class="w-full p-2 border rounded"
                  >
${user?.bio}</textarea
                  >
                </div>
                <button
                  type="submit"
                  class="w-full bg-blue-600 text-white p-2 rounded font-bold"
                >
                  프로필 업데이트
                </button>
              </form>
            </div>
          </main>
          ${Footer()}
        </div>
      </div>
    </div>
  `;
};

export default ProfilePage;
