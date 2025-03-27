import User from "../store/user";
import navigate from "../core/navigate";

const user = new User();

//git reset
export function handleSubmit(e) {
  e.preventDefault();
  if (e.target && e.target.id === "login-form") {
    let username = document.getElementById("username")?.value;
    user.set({ username });
    navigate("/profile");
  }

  if (e.target && e.target.id === "profile-form") {
    let username = document.getElementById("username")?.value;
    let bio = document.getElementById("bio")?.value;
    let email = document.getElementById("email")?.value;

    user.set({ username, bio, email });
    alert("프로필이 업데이트되었습니다.");
  }
}

export function handleClick(e) {
  if (e.target && e.target.nodeName == "A") {
    e.preventDefault();
    const nextPathName = e.target.href.replace(location.origin, "");
    navigate(nextPathName);
  }
  if (e.target && e.target.id === "logout") {
    user.clear();
    navigate("/login");
  }
}
