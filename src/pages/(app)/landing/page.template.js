import { PostCard, SubmitButton } from "@components";

export const landingTemplate = ({ posts }) =>
  `
    <div class="mb-4 bg-white rounded-lg shadow p-4">
      <textarea id="post-textarea" class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
      ${SubmitButton({ className: "mt-2 !w-fit !px-4 hover:bg-blue-700 active:bg-blue-800", id: "post-button", label: "게시" })}
    </div>
    <div id="posts-container" class="space-y-4">
      ${posts.map((post) => PostCard({ post })).join("")}
    </div>
  `;
