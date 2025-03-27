import { getData } from "../utils/localStorage";
import { browserNavigate } from "../utils/navigate";
import { removeData, setData } from "../utils/localStorage";
import { isHash } from "../utils/isHash";
import { Layout } from "../components/common/Layout";
// import store from "../store/store";

class ProfilePage {
  constructor($container) {
    this.$container = $container;
    this.render();
  }

  render = () => {
    const user = getData("user", null);
    if (!user) {
      isHash ? (location.hash = "/login") : browserNavigate("/login", true);
      return;
    }
    this.$container.innerHTML = /*html*/ `
        <div id="root">
          ${Layout(`<main class="p-4">
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
                      >${user.bio}</textarea
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
             </main>`)}
             
           
        </div>
      `;
    this.setEvent();
  };

  setEvent = () => {
    // profile 페이지에는 logout만 렌더됨.

    this.$logoutButton = this.$container.querySelector("#logout");

    this.$logoutButton.addEventListener("click", () => {
      removeData("user");
    });

    this.form = this.$container.querySelector("#profile-form");
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const $usernameInput = this.form.querySelector("#username");
      const $emailInput = this.form.querySelector("#email");
      const $bioInput = this.form.querySelector("#bio");

      setData("user", {
        username: $usernameInput.value,
        email: $emailInput.value,
        bio: $bioInput.value,
      });
    });

    this.$nav = this.$container
      .querySelector("nav")
      .addEventListener("click", (e) => {
        const target = e.target.closest("a");
        if (!(target instanceof HTMLAnchorElement)) return;

        e.preventDefault();

        const targetPath = target.href.replace(location.origin, "");
        isHash
          ? (location.hash = targetPath)
          : browserNavigate(targetPath, true);
      });
  };
}

export default ProfilePage;
