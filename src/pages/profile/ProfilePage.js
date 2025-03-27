import { Layout, FormInput, FormTextarea } from "@/components";
import { authManager, USER } from "@/utils/auth";

const ProfilePage = ({ user }) => {
  const content = `
    <div class="bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
        내 프로필
      </h2>
      <form id="profile-form">
        ${FormInput({
          label: "사용자 이름",
          id: "username",
          value: user?.username,
        })}
        ${FormInput({
          label: "이메일",
          id: "email",
          value: user?.email,
          type: "email",
        })}
        ${FormTextarea({
          label: "자기소개",
          id: "bio",
          value: user?.bio,
        })}
        <button
          type="submit"
          class="w-full bg-blue-600 text-white p-2 rounded font-bold"
        >
          프로필 업데이트
        </button>
      </form>
    </div>
  `;

  return Layout({
    content,
    isLoggedIn: authManager.isLoggedIn(USER),
  });
};

export default ProfilePage;
