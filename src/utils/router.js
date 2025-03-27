import { MainPage } from "../view/home";
import { ProfilePage } from "../view/profile";
import { LoginPage } from "../view/login";
import { ErrorPage } from "../view/nonexistent";

import { login, logout, updateUser, isLoggedIn } from "../store/auth";
import { BASE_PATH } from "./constants";

export const routes = {
  [BASE_PATH]: MainPage,
  [BASE_PATH + "profile"]: () => {
    if (!isLoggedIn()) {
      return { redirect: BASE_PATH + "login" };
    }
    return ProfilePage();
  },
  [BASE_PATH + "login"]: () => {
    if (isLoggedIn()) {
      return { redirect: BASE_PATH };
    }
    return LoginPage();
  },
};

export class Router {
  static instance = null;

  static getInstance(routes, options) {
    if (!Router.instance) {
      Router.instance = new Router(routes, options);
    }
    return Router.instance;
  }

  constructor(routes, options = { mode: "history" }) {
    if (Router.instance) {
      return Router.instance;
    }

    this.routes = routes;
    this.mode = options.mode;

    this.currentPath =
      this.mode === "hash"
        ? window.location.hash.slice(1) || "/"
        : window.location.pathname;

    if (this.mode === "hash") {
      window.addEventListener("hashchange", () => {
        this.currentPath = window.location.hash.slice(1) || "/";
        this.render();
      });
    } else {
      window.addEventListener("popstate", () => {
        this.currentPath = window.location.pathname;
        this.render();
      });
    }

    Router.instance = this;

    document.addEventListener("click", (e) => {
      console.log("click", e.target);

      if (e.target.id === "logout") {
        e.preventDefault();
        logout();
        this.navigate("/login");
      }
      if (e.target.matches("[data-link]")) {
        e.preventDefault();
        this.navigate(e.target.getAttribute("href"));
      }
    });

    document.addEventListener("submit", (e) => {
      console.log("submit", e.target);

      e.preventDefault();
      if (e.target.id === "login-form") {
        const username = document.getElementById("username").value;
        login({ username, email: "", bio: "" });
        this.navigate("/profile");
      }

      if (e.target.id === "profile-form") {
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const bio = document.getElementById("bio").value;
        updateUser({ username, email, bio });
      }
    });
  }
  getLinkHref(path) {
    return this.mode === "hash" ? `#${path}` : path;
  }

  navigate(to) {
    if (this.mode === "hash") {
      window.location.hash = to;
    } else {
      window.history.pushState({}, "", to);
    }
    this.currentPath = to;
    this.render();
  }

  render() {
    const page = this.routes[this.currentPath]
      ? this.routes[this.currentPath]()
      : ErrorPage();

    if (page && typeof page === "object" && page.redirect) {
      this.navigate(page.redirect);
      return;
    }

    const rootEl = document.getElementById("root");
    if (rootEl) {
      rootEl.innerHTML = page;
    }
  }
}

// class Subject {
//   constructor() {
//     this.observers = [];
//   }

//   addObserver(observer) {
//     this.observers.push(observer);
//   }

//   removeObserver(observer) {
//     const index = this.observers.indexOf(observer);
//     if (index > -1) {
//       this.observers.splice(index, 1);
//     }
//   }

//   notifyObservers(data) {
//     this.observers.forEach((observer) => observer.update(data));
//   }
// }

// export class Observer {
//   update(data) {
//     console.log("Received update:", data);
//   }
// }

// export class Store extends Subject {
//   constructor(initialState) {
//     super();
//     this.state = initialState;
//   }

//   setState(newState) {
//     this.state = { ...this.state, ...newState };
//     this.notifyObservers(this.state);
//   }

//   getState() {
//     return this.state;
//   }
// }

// export class Component {
//   constructor(store) {
//     this.store = store;
//     this.store.addObserver(this);
//   }

//   update(state) {
//     this.render(state);
//   }

//   render(state) {
//     console.log("컴포넌트 별 렌더링 로직", state);
//   }
// }
