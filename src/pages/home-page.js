import { Component } from "../core/Component";
import { Footer, Header } from "../layout";
import { mockFeed } from "../mock/feed.mock";

export class MainPage extends Component {
  template() {
    const { user } = this.props;

    return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
    ${new Header({ user }).template()}
      <main class="p-4">
        <div class="mb-4 bg-white rounded-lg shadow p-4">
          <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
          <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
        </div>

        <div class="space-y-4">
  ${mockFeed
    .map(
      (feed) => `
           <div class="bg-white rounded-lg shadow p-4">
            <div class="flex items-center mb-2">
              <img src="${feed.src}" alt="프로필" class="rounded-full mr-2">
              <div>
                <p class="font-bold">${feed.name}</p>
                <p class="text-sm text-gray-500">${feed.time}</p>
              </div>
            </div>
            <p>${feed.detail}</p>
            <div class="mt-2 flex justify-between text-gray-500">
              <button>좋아요</button>
              <button>댓글</button>
              <button>공유</button>
            </div>
          </div>
    `,
    )
    .join("")}
      </main>
     ${Footer()}
    </div>
  </div>
    `;
  }
}
