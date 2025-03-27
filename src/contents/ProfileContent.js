import { authStore, updateUser } from "../store/authStore";

const ProfileContent = () => {
  const render = () => /* html */ `
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
          ></textarea>
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

  const onRendered = () => {
    const user = authStore.getState("user");

    const username = user.username ?? "";
    const email = user.email ?? "";
    const bio = user.bio ?? "";

    document.getElementById("username").value = username;
    document.getElementById("email").value = email;
    document.getElementById("bio").value = bio;

    const form = document.querySelector("form");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const bio = document.getElementById("bio").value;

      updateUser({ username, email, bio });
    });
  };

  return {
    render,
    onRendered,
  };
};

export default ProfileContent;
