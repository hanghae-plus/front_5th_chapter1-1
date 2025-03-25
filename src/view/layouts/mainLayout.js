import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Nav } from "../components/nav";

export const MainLayout = (content) => `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${Header()}

      ${Nav()}

      ${content}

      ${Footer()}
    </div>
  </div>
`;
