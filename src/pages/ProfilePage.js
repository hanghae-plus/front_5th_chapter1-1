import Header from "../components/Header";
import Footer from "../components/Footer";

export const ProfilePage = () => {
  const profilePageWrapper = document.createElement("div");

  profilePageWrapper.innerHTML = /*html*/ `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
      ${Header()}

        <nav class="bg-white shadow-md p-2 sticky top-14">
          <ul class="flex justify-around">
            <li><a href="/" class="text-gray-600" data-path="/">홈</a></li>
            <li><a href="/profile" class="text-blue-600" data-path="/profile">프로필</a></li>
            <li><a href="/login" class="text-gray-600" data-path="/login" id="logout">로그아웃</a></li>
          </ul>
        </nav>

        <main class="p-4">
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
            <form id="profile-form">
              <div class="mb-4">
                <label for="username" class="block text-gray-700 text-sm font-bold mb-2">사용자 이름</label>
                <input type="text" id="username" name="username" class="w-full p-2 border rounded" />
              </div>
              <div class="mb-4">
                <label for="email" class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
                <input type="email" id="email" name="email" class="w-full p-2 border rounded" />
              </div>
              <div class="mb-6">
                <label for="bio" class="block text-gray-700 text-sm font-bold mb-2">자기소개</label>
                <textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded"></textarea>
              </div>
              <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">프로필 업데이트</button>
            </form>
          </div>
        </main>

      ${Footer()}

      </div>
    </div>
  `;

  const user = JSON.parse(localStorage.getItem("user") || "null");

  // ✅ user가 있을 때만 값 채우기
  if (user) {
    profilePageWrapper.querySelector("#username").value = user.username;
    profilePageWrapper.querySelector("#email").value = user.email;
    profilePageWrapper.querySelector("#bio").value = user.bio;
  }

  const editForm = profilePageWrapper.querySelector("#profile-form");

  const handleEdit = (e) => {
    e.preventDefault();
    const username = editForm.querySelector("#username").value;
    const email = editForm.querySelector("#email").value;
    const bio = editForm.querySelector("#bio").value;
    localStorage.setItem("user", JSON.stringify({ username, email, bio }));
  };

  editForm.addEventListener("submit", handleEdit);

  return profilePageWrapper;
};
