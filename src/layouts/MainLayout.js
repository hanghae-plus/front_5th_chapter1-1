import { Header } from "../components/Header.js";
import { Footer } from "../components/Footer.js";
import { Nav } from "../components/Nav.js";

export const MainLayout = (content) => {
  return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header()}
        ${Nav()}
        ${content}
        ${Footer()}
      </div>
    </div>
  `;
};
