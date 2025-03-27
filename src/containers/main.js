import { Footer, Header, Post } from "../components";

const posts = [
  {
    userName: "홍길동",
    createdAt: "5분 전",
    content: "오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!",
  },
  {
    userName: "김철수",
    createdAt: "15분 전",
    content: "새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!",
  },
  {
    userName: "이영희",
    createdAt: "30분 전",
    content: "오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?",
  },
  {
    userName: "박민수",
    createdAt: "1시간 전",
    content: "주말에 등산 가실 분 계신가요? 함께 가요!",
  },
  {
    userName: "정수연",
    createdAt: "2시간 전",
    content: "새로 나온 영화 재미있대요. 같이 보러 갈 사람?",
  },
];

export const MainPage = () => /*html*/ `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${Header()}

      <main class="p-4">
        <div class="mb-4 bg-white rounded-lg shadow p-4">
          <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
          <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
        </div>

        <div class="space-y-4">
          ${posts.map((post) => Post(post)).join("")}
        </div>
      </main>

      ${Footer()}
    </div>
  </div>
`;
