import { ROUTE } from "../_router/constants.js";

class Login {
  constructor(view, model, router) {
    this.view = view;
    this.model = model;
    this.router = router;
  }

  handleLogin = (event) => {
    event.preventDefault();

    const username = this.view.$username().value;

    if (!username.trim()) {
      alert("사용자 이름을 입력해주세요.");
      return;
    }

    const result = this.model.login(username);

    if (result.status === "error") {
      alert(result.error);
      return;
    }

    this.router.navigate(ROUTE.profile);
  };

  render = () => {
    this.view.render();
    this.view.setupEventListeners("login", this.handleLogin);
  };
}

export default Login;
