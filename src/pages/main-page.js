import Header from "@/layout/header";
import Footer from "@/layout/footer";
import { MOCK_POSTS } from "@/mock/posts";
import Post from "@/components/post";

const MainPage = () => /* HTML */ `
  <div>
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header()}
        <main class="p-4">
          <div class="mb-4 bg-white rounded-lg shadow p-4">
            <textarea
              class="w-full p-2 border rounded"
              placeholder="무슨 생각을 하고 계신가요?"
            ></textarea>
            <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
              게시
            </button>
          </div>
          <div class="space-y-4">
            ${MOCK_POSTS.map((post) => Post(post)).join("")}
          </div>
        </main>
        ${Footer()}
      </div>
    </div>
  </div>
`;

export default MainPage;
