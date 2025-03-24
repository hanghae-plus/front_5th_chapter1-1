import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { MOCK_DATA } from "../const/mockData";
import { FeedCard } from "../components/FeedCard";
import { removeData } from "../utils/localStorage";
import { navigate } from "../utils/navigate";
function MainPage($container) {
  console.log("mainpage");
  this.$container = $container;

  this.render = () => {
    this.$container.innerHTML = /*html*/ `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${Header()}
      <main class="p-4">
        <div class="mb-4 bg-white rounded-lg shadow p-4">
          <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
          <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
        </div>
        <div class="space-y-4">
         ${MOCK_DATA.map(FeedCard).join("")}
        </div>
      </main>

      ${Footer()}
    </div>
  </div>
`;
  };
  this.render();

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
      navigate(targetPath);
    });
}

export default MainPage;
