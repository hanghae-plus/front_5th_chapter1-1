import { MainLayout } from "../layouts/MainLayout";
import { PostInput } from "../components/PostInput";
import { PostCard } from "../components/PostCard";
import { POSTS } from "../data/posts";
import { userContext } from "../context/userContext";

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
