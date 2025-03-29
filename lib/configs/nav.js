import { PATH } from "./path";

export const NAV_CONFIGS = {
  common: [
    {
      id: "home",
      label: "홈",
      href: PATH.landing,
    },
  ],
  authenticated: [
    {
      id: "profile",
      label: "프로필",
      href: PATH.profile,
    },
    {
      id: "logout",
      label: "로그아웃",
      href: "#",
      action: "logout",
    },
  ],
  unauthenticated: [
    {
      id: "login",
      label: "로그인",
      href: PATH.login,
    },
  ],
};
