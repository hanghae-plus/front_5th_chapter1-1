import { Component } from "../core/Component";
import { Footer, Header } from "../layout";
import { Router } from "../route";
import { setUser } from "../utils/storage";

export class ProfilePage extends Component {
  template() {
    const { user } = this.props;

    return `
    <div>
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
    ${new Header({ user }).template()}

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
      </main>

      ${Footer()}
    </div>
  </div>
</div>
    `;
  }

  setEvent() {
    const updateProfile = () => {
      const profileForm = document.getElementById("profile-form");
      if (profileForm) {
        profileForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const username = profileForm.querySelector("#username").value.trim();
          const email = profileForm.querySelector("#email").value.trim();
          const bio = profileForm.querySelector("#bio").value.trim();
          const user = JSON.parse(localStorage.getItem("user"));
          const updateUser = { ...user, username, email, bio };

          setUser(updateUser);
          alert("프로필이 수정되었습니다");
          Router();
        });
      }
    };
    updateProfile();
  }
}
