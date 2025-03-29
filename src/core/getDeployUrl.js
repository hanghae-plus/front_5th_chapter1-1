import getRouterMode from "./getRouterMode";

/**배포 상태인 경우, 해당 배포url을 반환합니다. */
export default function getDeployUrl() {
  let routerMode = getRouterMode();
  const DEPLOY_URL = "/front_5th_chapter1-1";
  return routerMode === "history" && process.env.NODE_ENV === "production"
    ? DEPLOY_URL
    : "";
}
