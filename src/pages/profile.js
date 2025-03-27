import { Footer, Header, Nav } from "../components";
import { ProfileForm } from "../components/profileForm";

export const ProfilePage = {
  template: () => `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header.template()}
        ${Nav.template()}
        <main class="p-4">
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
              내 프로필
            </h2>
            ${ProfileForm.template()}
          </div>
        </main>
        ${Footer.template()}
      </div>
    </div>
  `,
  onMount: () => {
    Header.onMount();
    Nav.onMount();
    ProfileForm.onMount();
    Footer.onMount();
  },
};
