import { StandardPageLayout } from "../PageLayout.js";
import ProfileForm from "../ProfileForm.js";
import store from "../../store/store.js";

export const Profile = () => {
  const user = store.getState("user");
  const content = `
    <main class="p-4">
      <div class="bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">내 프로필</h2>
        ${ProfileForm(user)}
      </div>
    </main>
  `;
  return StandardPageLayout(content);
};

export default Profile;
