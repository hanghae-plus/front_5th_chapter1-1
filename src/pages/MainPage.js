import { Header, Footer } from "../components";

const MainPage = (content) => {
  const contentComponent = content();
  const headerComponent = Header();
  const footerComponent = Footer();

  const render = () => /* html */ `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${headerComponent.render()}

        <main id="main" class="p-4">
          ${contentComponent.render()}
        </main>

        ${footerComponent.render()}
      </div>
    </div>
  `;

  const onRendered = () => {
    contentComponent.onRendered?.();
    headerComponent.onRendered?.();
    footerComponent.onRendered?.();
  };

  return {
    render,
    onRendered,
  };
};

export default MainPage;
