const cardItem = [
    {
        id: 1,
        name: "홍길동",
        createdAt: "5분 전",
        desc: "오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!",
    },
    {
        id: 2,
        name: "김철수",
        createdAt: "15분 전",
        desc: "새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!",
    },
    {
        id: 3,
        name: "이영희",
        createdAt: "30분 전",
        desc: "오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?",
    },
    {
        id: 4,
        name: "박인수",
        createdAt: "1시간 전",
        desc: "주말에 등산 가실 분 계신가요? 함께 가요!",
    },
    {
        id: 5,
        name: "정수연",
        createdAt: "2시간 전",
        desc: "새로 나온 영화 재미있대요. 같이 보러 갈 사람?",
    },
];

const Card = () => `
    ${cardItem
        .map(
            (item) => `
        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex items-center mb-2">
            <img src="https://placehold.co/40" alt="프로필" class="rounded-full mr-2" />
            <div>
              <p class="font-bold">${item.name}</p>
              <p class="text-sm text-gray-500">${item.createdAt}</p>
            </div>
          </div>
          <p>${item.desc}</p>
          <div class="mt-2 flex justify-between text-gray-500">
            <button>좋아요</button>
            <button>댓글</button>
            <button>공유</button>
          </div>
        </div>
      `
        )
        .join("")}
  `;

export default Card;
