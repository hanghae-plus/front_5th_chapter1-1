// src/components/Layout.js
import { Header } from "./Header.js";
import { Footer } from "./Footer.js";
import { auth } from "../store/user.js";

const Layout = (content) => {
  const isLoginPage = content.includes('id="login-form"'); // 이거...콘텐츠의 id 값으로 판단하는게 맞는지....?
  const isNotFoundPage = content.includes("404");

  const hideLayout = isLoginPage || isNotFoundPage;

  const header = hideLayout ? "" : Header({ loggedIn: auth.loggedIn });
  const footer = hideLayout ? "" : Footer;

  return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${header}
        ${content}
        ${footer}
      </div>
    </div>
  `;
};

export default Layout;
