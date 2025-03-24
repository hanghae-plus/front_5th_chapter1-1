import Container from "../components/container.js";
import Footer from "../components/footer.js";
import Header from "../components/header.js";
import Nav from "../components/nav.js";
import { ROUTES } from "../config/index.js";
import store from "../store/index.js";

const ProfilePage = () => {
  const isLogon = !!store.get("username");
  const profileData = store.get();

  const profile = `
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
              value="${profileData?.username || "홍길동"}"
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
              value="${profileData?.email || "hong@example.com"}"
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
            >${profileData?.bio || "안녕하세요, 항해플러스에서 열심히 공부하고 있는 홍길동입니다."}</textarea>
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
  const template = Container({
    children: [
      Header(),
      Nav({ url: ROUTES.PROFILE, isLogon }),
      profile,
      Footer(),
    ].join(""),
  });
  return { template };
};
export default ProfilePage;
