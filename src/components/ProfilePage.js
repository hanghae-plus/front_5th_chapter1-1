import { html } from "../common/useHtml";
import { Header } from "../common/Header";
import { Footer } from "../common/Footer";
import { getUser } from "../common/store";

export const ProfilePage = {
  render: () => {
    const currentUser = JSON.parse(getUser());
    console.log(currentUser);
    return html`
      <div id="root">
        <div class="bg-gray-100 min-h-screen flex justify-center">
          <div class="max-w-md w-full">
            ${Header(true)}
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
                      value="${currentUser?.username || ""}"
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
                      value="${currentUser?.email || ""}"
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
                    ${currentUser?.bio || ""}</textarea
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
            ${Footer}
          </div>
        </div>
      </div>
    `;
  },
  // afterRender: () => {
  //   const profileForm = document.getElementById("profile-form");
  //   if (profileForm) {
  //     profileForm.addEventListener("submit", (e) => {
  //       e.preventDefault();
  //       let username = document.getElementById("username").value;
  //       let email = document.getElementById("email").value;
  //       let bio = document.getElementById("bio").value;
  //       console.log(email, bio);
  //       updateProfile(username, email, bio);
  //     });
  //   }
  // },
};
