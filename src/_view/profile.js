import Layout from "./layout.js";

class Profile {
  constructor() {
    this.$root = document.getElementById("root");
  }

  $nav = () => this.$root.querySelector("nav ul");
  $profileForm = () => this.$root.querySelector("#profile-form");

  setupEventListeners = (event, handler) => {
    switch (event) {
      case "navigate":
        this.$nav()?.addEventListener("click", handler);
        break;
      case "update":
        this.$profileForm()?.addEventListener("submit", handler);
        break;
    }
  };

  contents = (userInfo) => {
    return /*html*/ `
      <div class="bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
          내 프로필
        </h2>
        <form id="profile-form">
          <div class="mb-4">
            <label for="username" class="block text-gray-700 text-sm font-bold mb-2">
              사용자 이름
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value="${userInfo.username}"
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
              value="${userInfo.email}"
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
            >${userInfo.bio}</textarea>
          </div>
          <button
            type="submit"
            class="w-full bg-blue-600 text-white p-2 rounded font-bold"
          >
            프로필 업데이트
          </button>
        </form>
      </div>
    `;
  };

  render(userInfo) {
    this.$root.innerHTML = Layout.render(userInfo, this.contents(userInfo));
  }
}

export default Profile;
