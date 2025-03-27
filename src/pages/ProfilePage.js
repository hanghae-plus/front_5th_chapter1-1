import { MainLayout } from "../layouts/MainLayout";
import { userContext } from "../context/userContext";

export const ProfilePage = () => {
  const state = userContext.getState();
  const { user } = state;

  const content = `
    <main class="p-4">
      <div class="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
        <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
          내 프로필
        </h2>
        <form id="profile-form" onsubmit="return false;">
          <div class="mb-4">
            <label for="username" class="block text-gray-700 text-sm font-bold mb-2">
              사용자 이름
            </label>
            <input type="text" id="username" name="username" 
              value="${user.username}" class="w-full p-2 border rounded" />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-gray-700 text-sm font-bold mb-2">
              이메일
            </label>
            <input type="email" id="email" name="email" 
              value="${user.email}" class="w-full p-2 border rounded" />
          </div>
          <div class="mb-6">
            <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">
              자기소개
            </label>
            <textarea id="bio" name="bio" rows="4" 
              class="w-full p-2 border rounded">${user.bio}</textarea>
          </div>
          <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold mb-4">
            프로필 업데이트
          </button>
        </form>
      </div>
    </main>
  `;

  document.addEventListener("submit", function (e) {
    if (e.target.id === "profile-form") {
      e.preventDefault();
      const profileData = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        bio: document.getElementById("bio").value,
      };

      userContext.setState({
        user: { ...user, ...profileData },
      });
      alert("프로필이 업데이트되었습니다.");
    }
  });

  return MainLayout(content);
};
