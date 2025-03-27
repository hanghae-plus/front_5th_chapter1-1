import { MainLayout } from "../layouts/MainLayout.js";
import { PostInput } from "../components/PostInput.js";
import { PostCard } from "../components/PostCard.js";
import { POSTS } from "../data/posts.js";
import { userContext } from "../context/userContext.js";

export const MainPage = () => {
  const state = userContext.getState();

  const content = `
    <main class="p-4">
      ${state.isLoggedIn ? PostInput() : ""}
      <div class="space-y-4">
        ${POSTS.map((post) => PostCard(post)).join("")}
      </div>
    </main>
  `;

  return MainLayout(content);
};
