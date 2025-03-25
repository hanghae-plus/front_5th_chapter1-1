import { ensureRootElement } from "../../shared/utils";
import { Feed, mockData } from "../../widgets/feed";
import { Footer } from "../../widgets/footer";
import { Header } from "../../widgets/header";

export class MainPage {
  constructor() {
    this.header = new Header();
  }

  template() {
    return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${this.header.render()}

        <main class="p-4">
          <div class="mb-4 bg-white rounded-lg shadow p-4">
            <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
            <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
          </div>

          <div class="space-y-4">

            ${mockData.map((feed) => new Feed(feed.username, feed.createdAt, feed.content).render()).join("")}

          </div>
        </main>

        ${Footer()}
      </div>
    </div>
    `;
  }

  render() {
    const root = ensureRootElement();
    root.innerHTML = this.template();
    this.header.bindEvents();
    return this.template;
  }
}
