import { FooterComponent } from "../components/Footer";
import HeaderComponent from "../components/Header";
import { storage } from "../utils/localstorage";

// {username, email, profileContent}
export const ProfilePage = (userInfo) => `
  <div id="root">
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${HeaderComponent(userInfo)}

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
                  value=${userInfo?.username}
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
                  value=${userInfo?.email ? userInfo?.email : ""}
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
                  ${userInfo?.bio ? userInfo?.bio : ""}
                </textarea
                >
              </div>
              <button
                id="submit-profile-update"
                type="submit"
                class="w-full bg-blue-600 text-white p-2 rounded font-bold"
              >
                프로필 업데이트
              </button>
            </form>
          </div>
        </main>

        ${FooterComponent()}
      </div>
    </div>
  </div>
`;

export function addEventProfile() {
  const $updateProfileBtn = document.getElementById("submit-profile-update");
  $updateProfileBtn.addEventListener("click", () => {
    const $nameInput = document.getElementById("username");
    const $emailInput = document.getElementById("email");
    const $bioTextArea = document.getElementById("bio");

    const item = {
      name: $nameInput.value,
      email: $emailInput.value,
      bio: $bioTextArea.value,
    };
    storage.setStorage(item);
  });
}
