import { Header, Footer } from "../componentes/layout";
import { state } from "../store";
const Post = ({ id, name, createdAt, content }) => /* html */ `
  <div class="bg-white rounded-lg shadow p-4" data-id="${id}">
   <div class="flex items-center mb-2">
     <img src="https://placehold.co/40" alt="프로필" class="rounded-full mr-2">
     <div>
       <p class="font-bold">${name}</p>
       <p class="text-sm text-gray-500">${createdAt}</p>
     </div>
   </div>
   <p>${content}</p>
   <div class="mt-2 flex justify-between text-gray-500">
     <button>좋아요</button>
     <button>댓글</button>
     <button>공유</button>
   </div>
  </div>`;

export default function HomePage() {
  return /* html */ `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${Header({ loggedIn: state.loginState })}
          <main class="p-4">
           ${
             state.loginState
               ? /* html */ `<div class="mb-4 bg-white rounded-lg shadow p-4">
              <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
              <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
            </div>`
               : ""
           }    
            <div class="space-y-4">
             ${state.posts.map(Post).join("")}
            </div>
          </main>
    
      ${Footer()}
      </div>
     </div>
    `;
}
