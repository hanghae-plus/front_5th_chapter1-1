/**
 * 유저 정보를 관리하는 서비스
 * @description 유저 정보를 로컬 스토리지에 저장하고 가져옴
 */
class UserService {
  static get user() {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : { username: "", email: "", bio: "" };
  }

  static set user({ username, email, bio }) {
    localStorage.setItem(
      "user",
      JSON.stringify({
        username,
        email,
        bio,
      }),
    );
  }
}
export default UserService;
