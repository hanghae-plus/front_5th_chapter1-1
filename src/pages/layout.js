// path: ~/Develop/front_5th_chapter1-1/src/pages/layout.js
import { Header, Footer, Navigation } from "../components/index";

export const Layout = (content) => `
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${Header()}
      ${Navigation()}
      <main>${content}</main>
      ${Footer()}
    </div>
  </div>
`;
