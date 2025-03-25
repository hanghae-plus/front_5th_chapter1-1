import Header from "../components/Header";
import Footer from "../components/Footer";
import posts from "../constants/posts";
import Card from "../components/Card";
import user from "../store/user";

const HomePage = () => {
  const isLoggedIn = user.getIsLoggedIn();
  console.log(isLoggedIn);

  return `
<div class="bg-gray-100 min-h-screen flex justify-center">
  <div class="max-w-md w-full">
    ${Header({ isLoggedIn })}
    <main class="p-4">
      <div class="mb-4 bg-white rounded-lg shadow p-4">
        <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
        <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
      </div>

      <ul class="space-y-4">
       ${posts
         .map(
           (post) =>
             `<li key="${post.id}">
             ${Card(post.img, post.alt, post.name, post.createdAt, post.content)}
             </li>`,
         )
         .join("")}
      </ul>
    </main>

    ${Footer}
  </div>
</div>
`;
};
export default HomePage;
