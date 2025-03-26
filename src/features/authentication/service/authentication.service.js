import { User, userStore } from "../../../entities/user";
import { router } from "../../../shared/libs";
import { InvalidError, LoginError } from "../errors";
import { validateLoginForm } from "../libs/validator";

// ? 이거는 서비스로직이지만 의존성을 주입하지 않을 경우 그냥 싱글톤 패턴으로 내보내는 것이 더 좋을까요?
export const AuthenticationService = () => ({
  login: ({ username, password }) => {
    try {
      validateLoginForm({ username, password });
      const user = User.build({ username });
      userStore.setUser(user);
      router.navigateTo("/profile");
    } catch (error) {
      if (error instanceof InvalidError) {
        throw new LoginError(`로그인 중 오류가 발생했습니다: ${error.message}`);
      }
      throw new LoginError(`로그인 중 오류가 발생했습니다: ${error.message}`);
    }
  },

  logout: () => {
    userStore.removeUser();
    router.navigateTo("/login");
  },
});

// ? 아래 코드와 위의 코드가 기능적으로 크게 다르지 않고 사용할때만 아래 처럼 차이가 난다고 생각하는데 제 생각이 맞다면 어느 것을 실제 현업에서 많이 보셨거나 사용하셨나요?
// ? AuthenticationService().login()
// ? AuthenticationService.login()
// ? 저는 위의 함수형 같은 경우에는 의존성을 주입할 때는 유용하다고 생각이 들긴 하는데, class로 선언한 것도 static이 아니라 싱글톤 패턴을 사용한다면 큰 차이가 없다고 생각이 듭니다.
// export class AuthenticationService {
//   static login = (username) => {
//     userStore.setUser({
//       username: username,
//       email: "",
//       bio: "",
//     });
//     router.navigateTo("/profile");
//   };

//   static logout = () => {
//     userStore.removeUser();
//     router.navigateTo("/login");
//   };
// }
