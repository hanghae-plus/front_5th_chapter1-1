/**histiry, hash기반의 라우트 모드를 결정 */
export default function getRouterMode() {
  return window.location.hash.includes("#") ? "hash" : "history";
}
