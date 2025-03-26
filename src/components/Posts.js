const Posts = () => {
  const posts = [
    {
      id: 1,
      author: "홍길동",
      createdAt: "5분 전",
      content: "오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!",
    },
    {
      id: 2,
      author: "김철수",
      createdAt: "15분 전",
      content: "새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!",
    },
    {
      id: 3,
      author: "이영희",
      createdAt: "30분 전",
      content: "오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?",
    },
    {
      id: 4,
      author: "박민수",
      createdAt: "1시간 전",
      content: "주말에 등산 가실 분 계신가요? 함께 가요!",
    },
    {
      id: 5,
      author: "정수연",
      createdAt: "2시간 전",
      content: "새로 나온 영화 재미있대요. 같이 보러 갈 사람?",
    },
  ];

  return posts
    .map(
      (post) => /*html*/ `
      <div class="bg-white rounded-lg shadow p-4" data-id=${post.id}>
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
    `,
    )
    .join("");
};

export default Posts;
