import { Footer, HeaderComponent } from "../components";
import { CONST } from "../constants";
import { state } from "../state";

export const ProfilePage = (container) => {
  if (!container) return;

  if (!state.loggedInUser) {
    return window.router.navigate(CONST.pathname.login);
  }

  container.innerHTML = `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${new HeaderComponent().render()}
        <main class="p-4">
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
              내 프로필
            </h2>
            <form id="${CONST.profileForm.formId}">
              <div class="mb-4">
                <label for="${CONST.profileForm.field.username}" class="block text-gray-700 text-sm font-bold mb-2">
                  사용자 이름
                </label>
                <input type="text" id="${CONST.profileForm.field.username}" name="${CONST.profileForm.field.username}" class="w-full p-2 border rounded" />
              </div>
              <div class="mb-4">
                <label for="${CONST.profileForm.field.email}" class="block text-gray-700 text-sm font-bold mb-2">
                  이메일
                </label>
                <input type="email" id="${CONST.profileForm.field.email}" name="${CONST.profileForm.field.email}" class="w-full p-2 border rounded" />
              </div>
              <div class="mb-6">
                <label for="${CONST.profileForm.field.bio}" class="block text-gray-700 text-sm font-bold mb-2">
                  자기소개
                </label>
                <textarea id="${CONST.profileForm.field.bio}" name="${CONST.profileForm.field.bio}" rows="4" class="w-full p-2 border rounded"></textarea>
              </div>
              <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">
                프로필 업데이트
              </button>
            </form>
          </div>
        </main>
        ${Footer()}
      </div>
    </div>
  `;

  const profileForm = document.getElementById(CONST.profileForm.formId);
  if (!profileForm) return;

  // 초기 값 세팅
  const fieldIdList = [
    CONST.profileForm.field.username,
    CONST.profileForm.field.bio,
    CONST.profileForm.field.email,
  ];
  for (const fieldId of fieldIdList) {
    const field = profileForm.querySelector(`#${fieldId}`);
    field.value = state.loggedInUser[fieldId] ?? "";
  }

  // 제출 이벤트 처리
  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(profileForm);
    const newData = Object.fromEntries(formData);
    const oldData = state.loggedInUser;

    const isProfileChanged =
      newData.username !== oldData.username ||
      newData.email !== oldData.email ||
      newData.bio !== oldData.bio;

    if (isProfileChanged) {
      const newUserInfo = { ...state.loggedInUser, ...newData };
      const userIndex = state.users.findIndex(
        (user) => user.username === state.loggedInUser.username,
      );
      state.users.splice(userIndex, 1, newUserInfo);
      localStorage.setItem(CONST.lsKey.users, JSON.stringify(state.users));

      state.loggedInUser = newUserInfo;
      localStorage.setItem(CONST.lsKey.user, JSON.stringify(newUserInfo));

      alert("profile 변경 완료");
    }
  });
};
