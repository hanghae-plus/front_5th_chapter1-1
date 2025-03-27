import Header from "./Header";
import Navigate from "./Navigate";
import Footer from "./Footer";

const MainLayout = (content) => `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${Header()}
      ${Navigate()}
      <main class="p-4">
        ${content()}
      </main>
      ${Footer()}
    </div>
  </div>
`;

export default MainLayout;
