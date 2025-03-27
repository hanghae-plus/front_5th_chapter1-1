export const Card = (post) => {
  const { profileImage, author, timeAgo, content, id } = post;

  return `
    <div class="bg-white rounded-lg shadow p-4" data-post-id="${id || ""}">
        <div class="flex items-center mb-2">
          <img src="${profileImage}" alt="프로필" class="rounded-full mr-2">
          <div>
            <p class="font-bold">${author}</p>
            <p class="text-sm text-gray-500">${timeAgo}</p>
          </div>
        </div>
        <p>${content}</p>
        <div class="mt-2 flex justify-between text-gray-500">
          <button class="post-action" data-action="like" data-post-id="${id || ""}">좋아요</button>
          <button class="post-action" data-action="comment" data-post-id="${id || ""}">댓글</button>
          <button class="post-action" data-action="share" data-post-id="${id || ""}">공유</button>
        </div>
    </div>
  `;
};

export default Card;
