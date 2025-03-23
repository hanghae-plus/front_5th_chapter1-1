import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import { useUserStore } from "../stores/user.js";
import { defineComponent } from "../helpers/component";

const ProfileContent = {
  name: "Profile",
  components: [Header, Footer],
  template: ({ children }) => {
    const userStore = useUserStore();
    const userInfo = userStore.userInfo;
    return `
    <div id="root">
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          ${children.Header()}
          <main class="p-4">
            <div class="bg-white p-8 rounded-lg shadow-md">
              <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
                내 프로필
              </h2>
              <form id="profile-form">
                <div class="mb-4">
                  <label for="username" class="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
                  <input type="text" id="username" name="username" value="${userInfo.username || ""}" class="w-full p-2 border rounded" />
                </div>
                <div class="mb-4">
                  <label for="email" class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
                  <input type="email" id="email" name="email" value="${userInfo.email || ""}" class="w-full p-2 border rounded" />
                </div>
                <div class="mb-6">
                  <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows="4"
                    class="w-full p-2 border rounded"
                  >${userInfo.bio || ""}</textarea>
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
          ${children.Footer()}
        </div>
      </div>
    </div>
  `;
  },
  domEvent: () => {
    const userStore = useUserStore();
    const profileForm = document.querySelector("#profile-form");

    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = profileForm.querySelector("#username").value;
      const email = profileForm.querySelector("#email").value;
      const bio = profileForm.querySelector("#bio").value;

      userStore.setUserInfo({ username, email, bio });
    });
  },
};

export default defineComponent(ProfileContent);
