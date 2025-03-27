import { setData } from "../../utils/localStorage";

import { getData } from "../../utils/localStorage";

class ProfileForm {
  constructor($container) {
    this.$container = $container;
    this.render();
  }

  render = () => {
    const user = getData("user", null);
    this.$container.innerHTML = /*html*/ `<form id="profile-form">
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
                </form>`;
    this.setEvent();
  };

  setEvent = () => {
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
  };
}

export default ProfileForm;
