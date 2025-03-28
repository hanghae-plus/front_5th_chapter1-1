import { Header } from "./component/Header";
import { Footer } from "./component/Footer.js";

export const layout = (page) => `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${Header()}
      <main class="p-4">
        <div class="space-y-4">
          ${page()}
        </div>
      </main>
      ${Footer()}
    </div>
  </div>
`;
