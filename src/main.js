import { MainPage } from "./view/home";
import { ProfilePage } from "./view/profile";
import { LoginPage } from "./view/login";
import { ErrorPage } from "./view/nonexistent";

// import { Router, Store } from './utils/utils';
import { Router } from "./utils/utils";

/* 라우터 */
Router.addRoute("/", MainPage);
Router.addRoute("/profile", ProfilePage);
Router.addRoute("/login", LoginPage);
Router.addRoute("404", ErrorPage);

Router.init();
