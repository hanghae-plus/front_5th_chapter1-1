import { MainLayout } from "../layouts/mainLayout";
import { PostInput } from "../components/postInput";
import { PostCard } from "../components/postCard";
import { POSTS } from "../../data/posts";

export const MainPage = (state) => {
  const content = `
    <main class="p-4">
       ${state.isLoggedIn ? PostInput() : ""}
      <div class="space-y-4">
        ${POSTS.map((post) => PostCard(post)).join("")}
      </div>
    </main>
  `;

  return MainLayout(content, state.isLoggedIn, state.path);
};
