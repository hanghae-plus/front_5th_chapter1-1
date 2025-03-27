import { ensureRootElement } from "@/shared/utils";
import { config } from "../../shared/config";

export class NotFoundPage {
  constructor() {
    this.template = this.template();
    // ? 이런 긴 String을 관리한 적이 없어서 이렇게 작성을 했는데, 그냥 아래와 같이 constructor에서 관리하는 것이 더 나을까요 ?
    // ? this.template = `<main class ... </main>`
  }

  template() {
    return `
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full text-center" style="max-width: 480px">
      <h1 class="text-2xl font-bold text-blue-600 mb-4">항해플러스</h1>
      <p class="text-4xl font-bold text-gray-800 mb-4">404</p>
      <p class="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
      <p class="text-gray-600 mb-8">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>
      <a data-link href="${config.basePath}/" class="bg-blue-600 text-white px-4 py-2 rounded font-bold">
        홈으로 돌아가기
      </a>
    </div>
  </main>
`;
  }

  render() {
    const root = ensureRootElement();
    root.innerHTML = this.template;
    return this.template;
  }
}
