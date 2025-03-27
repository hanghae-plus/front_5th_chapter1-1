import { StandardPageLayout } from "../PageLayout.js";
import PostForm from "../PostForm.js";
import Posts from "../Posts.js";
import store from "../../store/store.js";

const Home = () => {
  const isLoggedIn = store.getState("isLoggedIn");

  const content = `
    <main class="p-4">
      ${isLoggedIn ? PostForm() : ""}
      ${Posts()}
    </main>
  `;
  return StandardPageLayout(content);
};

export default Home;
