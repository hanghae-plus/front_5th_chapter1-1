import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = (children) => {
  return /*html*/ `
    <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
            ${Header()}
            ${children}
            ${Footer()}
        </div>
    </div>
  `;
};
