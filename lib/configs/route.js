import LandingPage from "@/pages/(app)/landing/page";
import ProfilePage from "@/pages/(app)/profile/page";
import LoginPage from "@/pages/login/page";

import { PATH } from "./path";

const APP_ROUTES = [
  { path: PATH.landing, element: LandingPage },
  { path: PATH.profile, element: ProfilePage },
  { path: PATH.login, element: LoginPage },
];

export { APP_ROUTES };
