import Header from "./Header.js";
import Footer from "./Footer.js";

export const StandardPageLayout = (content) => {
  return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header()}
        <main class="p-4">
          ${content}
        </main>
        ${Footer()}
      </div>
    </div>
  `;
};

export const FullPageLayout = (content) => {
  return `
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      ${content}
    </main>
  `;
};
