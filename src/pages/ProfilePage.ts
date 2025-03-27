import { Header, Footer } from "@/components/common";
import { ProfileForm } from "@/components/user";
// TODO: 공통 레이아웃 만들어서 적용
const ProfilePage = () => {
  const { template: HeaderTemplate, setEventHandlers: setHeaderEventHandlers } =
    Header();
  const {
    template: ProfileFormTemplate,
    setEventHandlers: setProfileFormEventHandlers,
  } = ProfileForm();

  const template = () => /* HTML */ `
    <div id="root">
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          ${HeaderTemplate()}
          <main class="p-4">
            <div class="bg-white p-8 rounded-lg shadow-md">
              <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
                내 프로필
              </h2>
              ${ProfileFormTemplate}
            </div>
          </main>
          ${Footer}
        </div>
      </div>
    </div>
  `;

  const setEventHandlers = () => {
    setHeaderEventHandlers();
    setProfileFormEventHandlers();
  };
  return { template, setEventHandlers };
};

export default ProfilePage;
