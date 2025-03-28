import Header from "./Header";
import Footer from "./Footer";

export default (children) => {
  const layout = document.createElement("div");
  layout.classList.add("bg-gray-100", "min-h-screen", "flex", "justify-center");
  layout.innerHTML = `
      <div class="max-w-md w-full">
        ${Header()}
            ${children}
        ${Footer()}
        </div>
    `;
  return layout;
};
