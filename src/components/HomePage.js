import { state } from "../state";

const HomePage = () => `
  <div class="mb-4 bg-white rounded-lg shadow p-4">
    <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
    <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
  </div>
  <div class="space-y-4">
    ${renderPosts()}
  </div>
`;

const renderPosts = () => {
  return state.posts
    .map(
      (post) => `
    <div class="bg-white rounded-lg shadow p-4">
      <div class="flex items-center mb-2">
        <img src="https://placehold.co/40" alt="프로필" class="rounded-full mr-2">
        <div>
          <p class="font-bold">${post.name}</p>
          <p class="text-sm text-gray-500">${post.time}</p>
        </div>
      </div>
      <p>${post.content}</p>
      <div class="mt-2 flex justify-between text-gray-500">
        <button>좋아요</button>
        <button>댓글</button>
        <button>공유</button>
      </div>
    </div>
  `,
    )
    .join("");
};

export default HomePage;
