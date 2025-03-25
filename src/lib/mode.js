/**histiry, hash기반의 라우트 모드를 결정 */
export const mode = () => {
  let mode = "history";

  if (window.location.hash.includes("#")) {
    mode = "hash";
  }

  return mode;
};
