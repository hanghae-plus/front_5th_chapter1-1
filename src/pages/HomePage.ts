import { Header, Footer } from "@/components/common";
import { PostFeed } from "@/components/post";
import { MOCK_POSTS } from "@/utils/data";
// TODO: 공통 레이아웃 폴더, 파일 만들어서 적용
const HomePage = () => {
  const { template: HeaderTemplate, setEventHandlers: setHeaderEventHandlers } =
    Header();

  const template = () => /* HTML */ `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${HeaderTemplate()}
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
            ${MOCK_POSTS.map((post) => PostFeed(post)).join("")}
          </div>
        </main>

        ${Footer}
      </div>
    </div>
  `;

  const setEventHandlers = () => {
    setHeaderEventHandlers();
  };
  return { template, setEventHandlers };
};

export default HomePage;
