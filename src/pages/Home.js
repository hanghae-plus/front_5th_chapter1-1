import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Posts from "../components/Posts";
import store from "../store";

const Home = () => {
  const { isLoggedIn } = store.getState();
  const header = Header();

  const init = () => {
    header.init();
  };

  const render = () => /*html*/ `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${header.render({ isLoggedIn })}

        <main class="p-4">
          <div class="mb-4 bg-white rounded-lg shadow p-4">
            <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
            <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
          </div>

          <div class="space-y-4">
            ${Posts()}
          </div>
        </main>

        ${Footer()}
      </div>
    </div>
  `;

  return { init, render };
};

export default Home;
