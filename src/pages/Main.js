import Header from "../components/Header.js";
import Nav from "../components/Nav.js";
import Post from "../components/Post.js";
import Footer from "../components/Footer.js";

const posts = [
  {
    name: "홍길동",
    createdAt: "5분전",
    content: "오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!",
  },
  {
    name: "김철수",
    createdAt: "15분전",
    content: "새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!",
  },
  {
    name: "이영희",
    createdAt: "30분전",
    content: "오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?",
  },
  {
    name: "박민수",
    createdAt: "1시간 전",
    content: "주말에 등산 가실 분 계신가요? 함께 가요!",
  },
  {
    name: "정수연",
    createdAt: "2시간 전",
    content: "새로 나온 영화 재미있대요. 같이 보러 갈 사람?",
  },
];

const Main = () => `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${Header}
      ${Nav}
      <main class="p-4">
        <div class="mb-4 bg-white rounded-lg shadow p-4">
          <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
          <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
        </div>
        <div class="space-y-4">
          ${posts.map(({ name, createdAt, content }) => Post(name, createdAt, content)).join("")}
        </div>
      </main>
      ${Footer}
    </div>
  </div>
`;
export default Main;
