import { PostCard } from "@components";
import postService from "@lib/services/post";

import { landingTemplate } from "./page.template";
import Layout from "../layout";

export default function LandingPage(container) {
  if (!container) return null;

  const handlePostSubmit = (event) => {
    event.preventDefault();
    const textarea = document.getElementById("post-textarea");
    const content = textarea.value.trim();

    if (content) {
      postService.addPost(content);
      textarea.value = "";
    }
  };

  const renderPosts = () => {
    const postsContainer = document.getElementById("posts-container");
    if (postsContainer) {
      postsContainer.innerHTML = postService
        .getPosts()
        .map((post) => PostCard({ post }))
        .join("");
    }
  };

  const { html, cleanUp } = Layout(container, {
    children: () => landingTemplate({ posts: postService.getPosts() }),
  });
  container.innerHTML = html;

  const postButton = document.getElementById("post-button");
  postButton?.addEventListener("click", handlePostSubmit);

  const unsubscribe = postService.subscribe(() => renderPosts());

  return () => {
    postButton?.removeEventListener("click", handlePostSubmit);
    unsubscribe();
    cleanUp?.();
  };
}
