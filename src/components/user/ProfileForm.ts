import { useUserStore } from "@/store";

const ProfileForm = () => {
  const userStore = useUserStore();

  const template = /* HTML */ ` <form id="profile-form">
    <div class="mb-4">
      <label for="username" class="block text-gray-700 text-sm font-bold mb-2"
        >사용자 이름</label
      >
      <input
        type="text"
        id="username"
        name="username"
        value="${userStore.user?.username}"
        class="w-full p-2 border rounded"
      />
    </div>
    <div class="mb-4">
      <label for="email" class="block text-gray-700 text-sm font-bold mb-2"
        >이메일</label
      >
      <input
        type="email"
        id="email"
        name="email"
        value="${userStore.user?.email}"
        class="w-full p-2 border rounded"
      />
    </div>
    <div class="mb-6">
      <label for="bio" class="block text-gray-700 text-sm font-bold mb-2"
        >자기소개</label
      >
      <textarea id="bio" name="bio" rows="4" class="w-full p-2 border rounded">
${userStore.user?.bio}</textarea
      >
    </div>
    <button
      type="submit"
      class="w-full bg-blue-600 text-white p-2 rounded font-bold"
    >
      프로필 업데이트
    </button>
  </form>`;

  const setEventHandlers = () => {
    const handleSubmit = (e: Event) => {
      e.preventDefault();

      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);

      const usernameValue = formData.get("username");
      const emailValue = formData.get("email");
      const bioValue = formData.get("bio");

      if (!usernameValue) {
        alert("사용자 이름을 입력해주세요.");
      } else {
        userStore.updateUser({
          username: usernameValue.toString(),
          email: emailValue ? emailValue.toString() : "",
          bio: bioValue ? bioValue.toString() : "",
        });

        alert("프로필이 업데이트 되었습니다.");
      }
    };

    document
      .getElementById("profile-form")
      ?.addEventListener("submit", handleSubmit);
  };
  return { template, setEventHandlers };
};

export default ProfileForm;
