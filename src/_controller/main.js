import { ROUTE } from "../_router/constants.js";

class Main {
  constructor(view, model, router) {
    this.view = view;
    this.model = model;
    this.router = router;
  }

  handleNavigation = (event) => {
    event.preventDefault();

    const link = event.target.closest("a");
    if (!link) return;

    const action = link.id;

    switch (action) {
      case "home":
        this.router.navigate(ROUTE.main);
        break;
      case "profile":
        this.router.navigate(ROUTE.profile);
        break;
      case "login-link":
        this.router.navigate(ROUTE.login);
        break;
      case "logout":
        this.model.logout();
        this.router.navigate(ROUTE.login);
        break;
    }
  };

  render = () => {
    this.view.render(this.model.userInfo);
    this.view.setupEventListeners("navigate", this.handleNavigation);
  };
}

export default Main;
