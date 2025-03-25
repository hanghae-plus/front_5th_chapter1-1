import Post from "./Post.js";
import posts from "../assets/posts.json";
const Posts = () => {
  return `
    <div class="space-y-4">
      ${posts.map((post) => Post(post)).join("")}
    </div>
  `;
};

export default Posts;
