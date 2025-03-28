import MainPage from "../pages/mainPage";
import LoginPage from "../pages/loginPage";
import ProfilePage from "../pages/profilePage";
import NotFoundPage from "../pages/notFoundPage";
import userStorage from "../store"
import { clickListeners, formListeners, inputListeners } from "../listeners";

const BASE_PATH = "/front_5th_chapter1-1";

const routes = {
    "/": MainPage,
    "/login": LoginPage,
    "/profile": ProfilePage,
    "*": NotFoundPage,
};

export const createRouter = ({ routerMode, root }) => {
    const navigate = (path) => {
        routerMode.navigate(BASE_PATH, path);
        render();
    };


    const render = () => {
        const path = routerMode.getPath(BASE_PATH);
        const user = userStorage.get();

        const root = document.getElementById("root");
        if (!root) return;

        let pageComponent;

        if (user.username && path === "/login") {
            routerMode.navigate(BASE_PATH, "/");
            pageComponent = routes["/"];
        } else if (!user.username && path === "/profile") {
            routerMode.navigate(BASE_PATH, "/login");
            pageComponent = routes["/login"];
        } else {
            pageComponent = routes[path] || routes["*"] || NotFoundPage;
        }

        root.innerHTML = pageComponent();
    };

    formListeners(root, navigate, userStorage);
    clickListeners(root, navigate, userStorage);
    inputListeners(root, userStorage)

    return { render, navigate };
};

