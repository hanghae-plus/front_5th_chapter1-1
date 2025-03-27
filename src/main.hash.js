import {
  ROUTE,
  HashRouter,
  createAuthGuard,
  createGuestGuard,
} from "./_router/index.js";
import { Store } from "./_store/index.js";
import * as view from "./_view/index.js";
import * as model from "./_model/index.js";
import * as controller from "./_controller/index.js";

const router = new HashRouter();
const userStore = new Store("user");
const userModel = new model.User(userStore);

// view
const mainView = new view.Main();
const profileView = new view.Profile();
const loginView = new view.Login();
const errorView = new view.Error();

// controller
const mainController = new controller.Main(mainView, userModel, router);
const profileController = new controller.Profile(
  profileView,
  userModel,
  router,
);
const loginController = new controller.Login(loginView, userModel, router);
const errorController = new controller.Error(errorView, userModel);

const requireAuth = createAuthGuard(userModel, router);
const requireGuest = createGuestGuard(userModel, router);

router.addRoute(ROUTE.main, mainController.render);
router.addRoute(ROUTE.profile, profileController.render, [requireAuth]);
router.addRoute(ROUTE.login, loginController.render, [requireGuest]);
router.addRoute(ROUTE.error, errorController.render);

document.addEventListener("DOMContentLoaded", router.init);
window.addEventListener("hashchange", router.init);
