const Post = (post) => {
  return `
    <div class="bg-white rounded-lg shadow p-4">
      <div class="flex items-center mb-2">
        <img src="https://placehold.co/40" alt="프로필" class="rounded-full mr-2">
        <div>
          <p class="font-bold">${post.author}</p>
          <p class="text-sm text-gray-500">${post.createdAt}</p>
        </div>
      </div>
      <p>${post.content}</p>
      <div class="mt-2 flex justify-between text-gray-500">
        <button>좋아요</button>
        <button>댓글</button>
        <button>공유</button>
      </div>
    </div>
  `;
};

export default Post;
