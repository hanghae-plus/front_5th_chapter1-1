import Header from "../components/Header.js";
import Footer from "../components/Footer.js";

// 프로필
const ProfilePage = (userData) => {
  const user = userData.getUser();

  return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
        ${Header(userData)}
        <main>
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
                  value="${user?.username || ""}"
                  placeholder="이름을 입력해주세요."
                  class="w-full p-2 border rounded"
                  required
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
                  value="${user?.email || ""}"
                  placeholder="이메일을 입력해주세요."
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
                  placeholder="자기소개를 입력해주세요."
                  class="w-full p-2 border rounded"
                  required
              >${user?.bio || ""}</textarea>
              </div>
              <button
              type="submit"
              class="w-full bg-blue-600 text-white p-2 rounded font-bold"
              >
              프로필 업데이트
              </button>
          </form>
        </main>
        ${Footer()}
        </div>
    </div>
    `;
};

export default ProfilePage;
