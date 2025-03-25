import Component from "../component";

import Header from "../components/Header";

class Profile extends Component {
  template() {
    return /*HTML*/ `
      <div id="root">
        <div class="bg-gray-100 min-h-screen flex justify-center">
          <div class="max-w-md w-full">
            ${Header.template()}

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
                      value="홍길동"
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
                      value="hong@example.com"
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
        안녕하세요, 항해플러스에서 열심히 공부하고 있는 홍길동입니다.
                  </textarea>
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

            <footer class="bg-gray-200 p-4 text-center">
              <p>&copy; 2024 항해플러스. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </div>
      `;
  }

  attachEventListeners() {
    const user = JSON.parse(localStorage.getItem("user"));
    document.getElementById("username").value = user.username;
    document.getElementById("email").value = user.email;
    document.getElementById("bio").value = user.bio;

    const profileForm = document.getElementById("profile-form");
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const bio = document.getElementById("bio").value;
      localStorage.setItem("user", JSON.stringify({ username, email, bio }));
    });
  }
}

export default Profile;
