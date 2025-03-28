import { Footer } from "../common/Footer";
import { Header } from "../common/Header";
import { getUser, state } from "../util/store";
import { router } from "../router";

export const ProfilePage = {
  getHtml: () => {
    const isLoggedIn = state.user;

    if (!isLoggedIn) {
      history.pushState(null, null, "/login");
      router();
    }

    let user = {
      username: "",
      email: "",
      bio: "",
      ...state.user,
    };

    return /*html*/ `
  <div id="root">
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
      ${Header.getHtml()}
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
                  value="${user.username}"
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
                  value="${user.email}"
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
                >${user.bio}</textarea>
              </div>
              <button
                id="update-profile"
                type="submit"
                class="w-full bg-blue-600 text-white p-2 rounded font-bold"
              >
                프로필 업데이트
              </button>
            </form>
          </div>
        </main>

        ${Footer.getHtml()}
      </div>
    </div>
  </div>
`;
  },

  afterRender: () => {
    const form = document.querySelector("#profile-form");

    form?.addEventListener("submit", (e) => {
      e.preventDefault();

      const username = document.querySelector("#username")?.value.trim() || "";
      const email = document.querySelector("#email")?.value.trim() || "";
      const bio = document.querySelector("#bio")?.value.trim() || "";

      const user = { ...getUser(), username, email, bio };
      localStorage.setItem("user", JSON.stringify(user));

      alert("프로필이 업데이트 되었습니다.");
    });
  },
};
