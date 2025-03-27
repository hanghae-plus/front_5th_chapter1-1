import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";

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
