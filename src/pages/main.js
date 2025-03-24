import { Footer, Header, NavComponent } from "../components";
import { getMockPosts } from "../mock/posts";

export const MainPage = (container) => {
  if (!container) return;

  container.innerHTML = `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header()}
        <nav class="bg-white shadow-md p-2 sticky top-14"></nav>
        <main class="p-4">
          <div class="mb-4 bg-white rounded-lg shadow p-4">
            <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
            <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
          </div>

          <div class="space-y-4">
            ${getMockPosts()}
          </div>
        </main>
        ${Footer()}
      </div>
    </div>
  `;

  const navContainer = container.querySelector("nav");
  const navComponent = new NavComponent(navContainer);
  navComponent.render();
};
