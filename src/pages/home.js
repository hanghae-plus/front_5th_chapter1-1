import Header from "../components/header";
import Footer from "../components/footer";
import Post from "../components/post";
import { MOCK_POSTS } from "../constants";
import store from "../store";

const HomePage = () => {
  const { isLoggedIn } = store.getState();
  const header = Header({ isLoggedIn });

  const template = `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${header.template}

        <main class="p-4">
          <div class="mb-4 bg-white rounded-lg shadow p-4">
            <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
            <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
          </div>

          <div class="space-y-4">
            ${MOCK_POSTS.map((post) =>
              Post({
                content: post.content,
                createdAt: post.createdAt,
                thumbnail: post.thumbnail,
                author: post.author,
              }),
            ).join("")}
          </div>
        </main>

        ${Footer()}
      </div>
    </div>
  `;

  const init = () => {
    header.init();
  };

  return {
    template,
    init,
  };
};

export default HomePage;
