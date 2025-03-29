import UserService from "@lib/services/user";
import { profileTemplate } from "./page.template";
import Layout from "../layout";

export default function ProfilePage(container) {
  if (!container) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    UserService.user = {
      username: formData.get("username"),
      email: formData.get("email"),
      bio: formData.get("bio"),
    };
  };

  const { html, cleanUp } = Layout(container, {
    children: () => profileTemplate(UserService.user),
  });

  container.innerHTML = html;

  const profileForm = document.getElementById("profile-form");
  profileForm?.addEventListener("submit", handleSubmit);

  return () => {
    const profileForm = document.getElementById("profile-form");
    profileForm?.removeEventListener("submit", handleSubmit);
    cleanUp?.();
  };
}
