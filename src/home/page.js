import contents from "./content.js";

export const HomePage = () => /* HTML */ `
  <!-- 메인 컨텐츠 -->
  <main class="p-4">
    <!-- 게시글 작성 -->
    <div class="mb-4 bg-white rounded-lg shadow p-4">
      <textarea
        class="w-full p-2 border rounded"
        placeholder="무슨 생각을 하고 계신가요?"
      ></textarea>
      <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
        게시
      </button>
    </div>

    <!-- 게시글 목록 -->
    <div class="space-y-4">${contents()}</div>
  </main>
`;
