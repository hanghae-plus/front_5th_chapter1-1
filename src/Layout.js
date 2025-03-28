import { Header } from "./component/Header.js";
import { Navigation } from "./component/Navigation.js";
import { Footer } from "./component/Footer.js";

export const Layout = (content, currentPath = "/") => `
    <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${Header()}
      ${Navigation(currentPath)}
        ${content}
      ${Footer()}      
    </div>
  </div>
`;
