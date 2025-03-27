import { Footer, Header, Nav, Posts } from "../components";

export const MainPage = {
  template: () => `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header.template()}
        ${Nav.template()}
        <main class="p-4">
          <div class="mb-4 bg-white rounded-lg shadow p-4">
            <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
            <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
          </div>

          <div class="space-y-4">
            ${Posts.template()}
          </div>
        </main>
        ${Footer.template()}
      </div>
    </div>
  `,
  onMount: () => {
    Header.onMount();
    Nav.onMount();
    Posts.onMount();
    Footer.onMount();
  },
};
