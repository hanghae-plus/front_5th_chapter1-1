import { ROUTE } from "../_router/constants.js";

class Profile {
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
      case "logout":
        this.model.logout();
        this.router.navigate(ROUTE.login);
        break;
    }
  };

  handleUpdate = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const userInfo = {
      username: formData.get("username"),
      email: formData.get("email"),
      bio: formData.get("bio"),
    };
    this.model.update(userInfo);
  };

  render = () => {
    this.view.render(this.model.userInfo);
    this.view.setupEventListeners("navigate", this.handleNavigation);
    this.view.setupEventListeners("update", this.handleUpdate);
  };
}

export default Profile;
