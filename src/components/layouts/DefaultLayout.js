import Footer from "./Footer";
import Header from "./Header";

const DefaultLayout = (component) => {
  const header = Header();

  const init = () => {
    header.init();
    component.init?.();
  };

  const template = /* html */ `
    <div class="bg-gray-100 min-h-screen flex justify-center">
      <div class="max-w-md w-full">
        ${header.template}
        ${component.template || component}
        ${Footer}
      </div>
    </div>
  `;

  return {
    init,
    template,
  };
};

export default DefaultLayout;
