import { authStore } from "../auth";

export function bindProfileEvent(container) {
  const profileForm = container.querySelector("#profile-form");
  if (!profileForm) return;

  profileForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = profileForm.querySelector("#username").value;
    const email = profileForm.querySelector("#email").value;
    const bio = profileForm.querySelector("#bio").value;

    if (!username) return;

    const userData = {
      username,
      email,
      bio,
    };

    authStore.setUser(userData);

    alert("프로필이 업데이트되었습니다.");
  });
}
