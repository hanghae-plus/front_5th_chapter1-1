import { browserNavigate } from "../utils/navigate";
import { removeData } from "../utils/localStorage";
import { isHash } from "../utils/isHash";
import { Layout } from "../components/common/Layout";
import ProfileForm from "../components/profile/ProfileForm";
// import store from "../store/store";

class ProfilePage {
  constructor($container) {
    this.$container = $container;
    this.render();
  }

  render = () => {
    this.$container.innerHTML = /*html*/ `
        <div id="root">
          ${Layout(/*html*/ `<main class="p-4">
                <div class="bg-white p-8 rounded-lg shadow-md">
                  <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
                    내 프로필
                 </h2>
                  <div data-component="profile-form"></div>
                </div>
             </main>`)}
             
           
        </div>
      `;
    this.setEvent();
    this.mount();
  };

  setEvent = () => {
    // profile 페이지에는 logout만 렌더됨.
    this.$logoutButton = this.$container.querySelector("#logout");
    this.$logoutButton.addEventListener("click", () => {
      removeData("user");
    });

    this.$nav = this.$container
      .querySelector("nav")
      .addEventListener("click", (e) => {
        const target = e.target.closest("a");
        if (!(target instanceof HTMLAnchorElement)) return;

        e.preventDefault();

        const targetPath = target.href.replace(location.origin, "");
        isHash
          ? (location.hash = targetPath)
          : browserNavigate(targetPath, true);
      });
  };

  mount = () => {
    const $profileFormAppender = this.$container.querySelector(
      "[data-component=profile-form]",
    );
    new ProfileForm($profileFormAppender);
  };
}

export default ProfilePage;
