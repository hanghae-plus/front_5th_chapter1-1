import { posts } from "./components/Posts/data.js";
import { userInfo } from "../../main.js";
import { renderPage } from "../../main.js";

export function addEventListenerToWritePost() {
  const writePost = document.getElementById("write-post");
  const textarea = writePost?.querySelector("textarea");
  const button = writePost?.querySelector("button");

  if (!textarea || !button) {
    return;
  }

  button.addEventListener("click", () => {
    const content = textarea.value;
    const data = {
      id: new Date().getTime(),
      author: userInfo?.username,
      createdAt: "방금",
      content: content,
    };
    posts.push(data);
    renderPage();
  });
}
