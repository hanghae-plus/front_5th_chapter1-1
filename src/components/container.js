import { $CE } from "../utils/create-component.js";

const Container = () => {
  const container = $CE(`
    <div class="bg-gray-100 min-h-screen flex justify-center">
    </div>
  `);
  const wrapper = $CE(`
    <div class="max-w-md w-full">
    </div>
  `);
  container.appendChild(wrapper);
  container.wrapper = wrapper;
  return container;
};

export default Container;
