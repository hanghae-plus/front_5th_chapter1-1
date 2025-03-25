export const ProfilePage = () => `
<div id="root">
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        <main class="p-4">
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
              내 프로필
            </h2>
            <form id='submit-form'>
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
                  value="이름"
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
                  value="이메일주소"
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
                >안녕하세요!</textarea>
              </div>
              <button id='submit-btn'
                type="submit"
                class="w-full bg-blue-600 text-white p-2 rounded font-bold"
              >
                프로필 업데이트
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  </div>
`;

const renderProfile = () => {
  // document.body.innerHTML = ProfilePage();

  const form = document.querySelector("#submit-form");
  const name = document.querySelector("#username");
  const email = document.querySelector("#email");
  const bio = document.querySelector("#bio");

  const handleSubmit = (e) => {
    e.preventDefault();

    const username = name.value;
    const useremail = email.value;
    const userbio = bio.value;

    localStorage.setItem("이름", username);
    localStorage.setItem("이메일", useremail);
    localStorage.setItem("자기소개", userbio);

    alert("프로필이 업데이트되었습니다.");
  };
  form.addEventListener("submit", handleSubmit);
};

document.addEventListener("DOMContentLoaded", renderProfile);
