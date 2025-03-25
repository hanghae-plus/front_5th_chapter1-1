import Header from "../components/Header";
import Footer from "../components/Footer";

import store from "../store";

const ProfilePage = () => {
  const user = store.state.user;

  const node = document.createElement("div");
  node.classList.add("bg-gray-100", "min-h-screen", "flex", "justify-center");
  node.innerHTML = `
    <div class="max-w-md w-full">
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
                value="${user?.username ?? ""}"
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
                value="${user?.email ?? ""}"
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
              >${user?.bio ?? ""}</textarea>
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
  `;

  const header = Header();
  const mainEl = node.querySelector("main");
  header.forEach((el) => {
    mainEl.insertAdjacentElement("beforebegin", el);
  });

  const handleSubmit = (event) => {
    if (event.target.id !== "profile-form") {
      return;
    }

    event.preventDefault();

    const formData = new FormData(event.target);
    const username = formData.get("username");

    if (!username) {
      alert("이름을 입력해주세요.");
      return;
    }

    const email = formData.get("email");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }

    const bio = formData.get("bio");

    const newUserData = {
      username,
      email,
      bio,
    };

    store.updateUser(newUserData);

    alert("프로필이 업데이트 되었습니다.");
  };

  node.addEventListener("submit", handleSubmit);

  return node;
};

export default ProfilePage;
