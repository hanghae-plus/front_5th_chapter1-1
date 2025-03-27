import { Footer } from "./Footer.js";
import Header from "./Header.js";

export function Layout(contents) {
  return `
    <div class="bg-gray-100 min-h-screen flex justify-center">
       <div class="max-w-md w-full">
         ${Header()}
          <main class="p-4">${contents}</main>   
          ${Footer()}
        </div>  
      </div>
  `;
}
