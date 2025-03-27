import userStore from "../module/userStore.js";
import router from "../module/route.js";

const ProfilePage = () => {
  if (!userStore.isLoggedIn()) {
    router.navigateTo("/login");
    return;
  }

  const user = userStore.getUser();
  const { username, email, bio } = user;

  return /* HTML */ `
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
            >
              사용자 이름
            </label>
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
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value="${email}"
              class="w-full p-2 border rounded"
            />
          </div>
          <div class="mb-6">
            <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">
              자기소개
            </label>
            <textarea
              id="bio"
              name="bio"
              rows="4"
              class="w-full p-2 border rounded"
            >
${bio}</textarea
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
  `;
};

// 이벤트 위임으로 처리
document.addEventListener("submit", (e) => {
  if (e.target.id === "profile-form") {
    e.preventDefault();
    const usernameValue = document.getElementById("username").value;
    const emailValue = document.getElementById("email").value;
    const bioValue = document.getElementById("bio").value;

    userStore.saveUser({
      username: usernameValue,
      email: emailValue,
      bio: bioValue,
    });

    alert("프로필 업데이트 완료");
  }
});

export default ProfilePage;
