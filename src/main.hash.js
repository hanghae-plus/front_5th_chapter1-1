import { Router } from "./public/hash_router";

const App = {
    init: () => {
        Router.render();
        window.addEventListener("hashchange", () => {
            Router.render();
        });
    },
};

App.init();