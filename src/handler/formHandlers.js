import { auth } from "../utils/auth.js";
import { navigate } from "../router/router.js";

export const formHandlers = {
  login: (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    // const password = document.getElementById("password").value;

    // 간단한 유효성 검사
    if (username.trim()) {
      auth.setUser({ username, email: "", bio: "" });
      navigate("/");
    }
  },

  profile: (event) => {
    event.preventDefault();
    const currentUser = auth.getUser();
    const updatedUser = {
      ...currentUser,
      email: document.getElementById("email").value,
      bio: document.getElementById("bio").value,
    };
    auth.setUser(updatedUser);
    alert("프로필이 업데이트되었습니다.");
  },

  logout: (event) => {
    event && event.preventDefault();
    auth.removeUser();
    navigate("/login");
  },
};

export const handleLogout = formHandlers.logout;
