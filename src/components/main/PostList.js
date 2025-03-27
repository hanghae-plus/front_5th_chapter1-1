import { MOCK_POSTS } from "../../constants/posts";
import PostListForm from "./PostListForm";
import PostListCard from "./PostListCard";

const PostList = `
  <main class="p-4">
    ${PostListForm}
    <div class="space-y-4">
      ${MOCK_POSTS.map(PostListCard).join("")}
    </div>
  </main>
`;

export default PostList;
