import { getUserInfo, setUserInfo } from "../../utils";

function ProfilePage() {
  const userinfo = getUserInfo();
  return `
    <div class="bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
        내 프로필
      </h2>
      <form id="profile-form">
        <div class="mb-4">
          <label
            for="username"
            class="block text-gray-700 text-sm font-bold mb-2"
            >사용자 이름</label>
          <input
            type="text"
            id="username"
            name="username"
            value="${userinfo?.username ?? ""}"
            class="w-full p-2 border rounded"
          />
        </div>
        <div class="mb-4">
          <label
            for="email"
            class="block text-gray-700 text-sm font-bold mb-2"
            >이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            value="${userinfo?.email ?? ""}"
            class="w-full p-2 border rounded"
          />
        </div>
        <div class="mb-6">
          <label
            for="bio"
            class="block text-gray-700 text-sm font-bold mb-2"
            >자기소개</label>
          <textarea
            id="bio"
            name="bio"
            rows="4"
            class="w-full p-2 border rounded"
          >${userinfo?.bio ?? ""}</textarea>
        </div>
        <button
          type="submit"
          id="submit-button"
          class="w-full bg-blue-600 text-white p-2 rounded font-bold"
        >
          프로필 업데이트
        </button>
      </form>
    </div>
`;
}

export function setUpProfileEvents() {
  const userinfo = getUserInfo();

  const form = document.getElementById("profile-form");

  document.getElementById("username").value = userinfo.username;
  document.getElementById("email").value = userinfo.email;
  document.getElementById("bio").value = userinfo.bio;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const bio = document.getElementById("bio").value;

    setUserInfo({ ...userinfo, username, email, bio });
    alert("프로필 변경이 완료되었습니다");
  });
}

export default ProfilePage;
