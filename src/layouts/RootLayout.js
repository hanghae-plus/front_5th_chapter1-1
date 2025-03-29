import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const RootLayout = ({ children, user }) => {
  return `
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          ${Header({ user })}
          ${children}
          ${Footer()}
        </div>
      </div>
  `;
};
