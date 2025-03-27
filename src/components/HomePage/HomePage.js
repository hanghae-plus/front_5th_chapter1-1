import { Footer } from "@/components/shared/Footer/Footer.js";
import { Header } from "@/components/shared/Header/Header.js";
import { Navigation } from "@/components/shared/Navigation/Navigation.js";
import { userInfo } from "@/main.js";

import { Posts } from "./components/Posts/Posts.js";
import { WritePost } from "./components/WritePost/WritePost.js";

export const HomePage = () => {
  const isLoggedIn = userInfo?.username;

  return `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${Header()}
      ${Navigation()}

      <main class="p-4">
        ${isLoggedIn ? WritePost() : ""}
        ${Posts()}
      </main>

      <footer class="bg-gray-200 p-4 text-center">
        ${Footer()}
      </footer>
    </div>
  </div>
`;
};
