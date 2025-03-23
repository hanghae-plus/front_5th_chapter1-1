import { defineComponent } from "../helpers/component";

const FooterContent = {
  name: "Footer",
  template: () => {
    return `
      <footer class="bg-gray-200 p-4 text-center">
        <p>&copy; 2024 항해플러스. All rights reserved.</p>
      </footer>
    `;
  },
};

export default defineComponent(FooterContent);
