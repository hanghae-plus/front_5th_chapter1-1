export const ProfilePage = () => {
  const userInfo = JSON.parse(localStorage.getItem("user") || "{}");

  return `
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
            value="${userInfo.username || ""}"
            class="w-full p-2 border rounded"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2">
            이메일
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value="${userInfo.email || ""}"
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
          >${userInfo.bio || ""}</textarea>
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

export function updateProfile() {
  const updateBtn = document.querySelector('button[type="submit"]');
  if (updateBtn) {
    updateBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const bio = document.getElementById("bio").value;

      const updatedInfo = {
        username,
        email,
        bio,
      };

      localStorage.setItem("user", JSON.stringify(updatedInfo));
      alert("프로필이 저장되었습니다!");

      if (window.location.hash.length > 0) {
        window.location.hash = "#/profile"; // Hash Router
      } else {
        window.history.pushState({}, "", "/profile"); // History Router
      }

      window.router(); // 새로 반영된 값으로 렌더링
    });
  }
}
