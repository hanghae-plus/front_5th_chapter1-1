import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ProfileForm from "../components/profile/ProfileForm";

const ProfilePage = () => {
  return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header()}

        <main class="p-4">
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
              내 프로필
            </h2>
            ${ProfileForm()}
          </div>
        </main>

        ${Footer()}
      </div>
    </div>
  `;
};

export default ProfilePage;
