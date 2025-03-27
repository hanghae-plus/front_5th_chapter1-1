import { auth } from "../store/user.js";
import { render } from "../main.js"; // ✅ 수정됨: 프로필 업데이트 후 화면 갱신용
import { setLocalStorageItem } from "../utils/stroage.js";

export const profileConfimHandler = () => {
  document
    .getElementById("profile-form")
    ?.addEventListener("submit", async (e) => {
      e.preventDefault();

      console.log("✅ 이벤트 핸들러 등록됨");

      const user = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        bio: document.getElementById("bio").value.trim(), // 공백 제거
      };

      console.log("🔧 저장할 user 값:", user);

      setLocalStorageItem("user", user);
      auth.user = { ...user }; // 최신 상태로 갱신

      history.pushState(null, "", "/profile");
      render();

      // 렌더링 완료 플래그 추가
      document.body.dataset.rendered = "true"; // ✅ 상태 변경
    });
};
export const ProfilePage = () => {
  const user = auth.user || { username: "", email: "", bio: "" };

  // 초기 렌더링 상태 설정
  document.body.dataset.rendered = "false"; // ✅ 초기 상태

  return `
    <main class="p-4" role="main">
      <div class="bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
          내 프로필
        </h2>
        <form id="profile-form">
          <div class="mb-4">
            <label for="username" class="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
            <input type="text" id="username" name="username" value="${user.username}" class="w-full p-2 border rounded" />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
            <input type="email" id="email" name="email" value="${user.email || ""}" class="w-full p-2 border rounded" />
          </div>
          <div class="mb-6">
            <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
            <textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded">${user.bio.trim()}</textarea>
          </div>
          <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">프로필 업데이트</button>
        </form>
      </div>
    </main>
  `;
};
