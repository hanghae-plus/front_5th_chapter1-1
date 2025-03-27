import { MOCK_DATA } from "../const/mockData";
import { FeedCard } from "../components/FeedCard";
import { removeData } from "../utils/localStorage";
import { browserNavigate } from "../utils/navigate";
import { isHash } from "../utils/isHash";
// import store from "../store/store";
import { Layout } from "../components/common/Layout";
class MainPage {
  constructor($container) {
    this.$container = $container;
    this.render();
  }

  render = () => {
    this.$container.innerHTML = `
       ${Layout(/*html*/ `<main class="p-4">
              <div class="mb-4 bg-white rounded-lg shadow p-4">
                <textarea id="contents" class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
                <button id="write" class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
              </div>
              <div class="space-y-4">
              ${MOCK_DATA.map(FeedCard).join("")}
              </div>
            </main>`)}
             
      `;
    this.setEvent();
  };

  setEvent = () => {
    this.$loginButton = this.$container.querySelector("#login");
    this.$logoutButton = this.$container.querySelector("#logout");

    if (this.$logoutButton) {
      this.$logoutButton.addEventListener("click", () => {
        removeData("user");
      });
    }

    this.$nav = this.$container
      .querySelector("nav")
      .addEventListener("click", (e) => {
        const target = e.target.closest("a");
        if (!(target instanceof HTMLAnchorElement)) return;

        e.preventDefault();
        const targetPath = target.href.replace(location.origin, "");
        console.log(targetPath, "targetPath");

        isHash
          ? (location.hash = targetPath)
          : browserNavigate(targetPath, true);
      });
  };
}

export default MainPage;
