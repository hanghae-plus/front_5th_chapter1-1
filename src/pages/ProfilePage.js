import { Nav, setupNavLogout } from "../components/Nav";

const ProfilePage = (container) => {
  if (!container) return;

  const userInfo = localStorage.getItem("user");

  if (!userInfo) {
    window.router.navigate("/login");
    return;
  }

  const user = JSON.parse(userInfo);
  const username = user.username || "";
  const email = user.email || "";
  const bio = user.bio || "";

  container.innerHTML = `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      <header class="bg-blue-600 text-white p-4 sticky top-0">
        <h1 class="text-2xl font-bold">항해플러스</h1>
      </header>

    ${Nav()}

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
                value="${username}"
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
                value="${email}"
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
              >${bio}</textarea>
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
`;
  setupNavLogout();

  const profileForm = document.getElementById("profile-form");

  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const updatedUsername = document.getElementById("username").value;
    const updatedEmail = document.getElementById("email").value;
    const updatedBio = document.getElementById("bio").value;

    const updatedUserData = {
      username: updatedUsername,
      email: updatedEmail,
      bio: updatedBio,
    };

    localStorage.setItem("user", JSON.stringify(updatedUserData));

    alert("프로필이 업데이트되었습니다.");
  });
};

export default ProfilePage;
