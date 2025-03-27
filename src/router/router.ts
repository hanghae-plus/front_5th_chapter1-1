import BrowserRouter from "./browserRouter";
import HashRouter from "./hashRouter";

type RouterType = "browser" | "hash";

let routerType: RouterType = "browser";
// 라우터 타입 설정
export const setRouterType = (type: RouterType) => {
  routerType = type;
};
// 현재 타입에 맞는 라우터 클래스를 반환
const getRouter = () => {
  return routerType === "browser" ? BrowserRouter : HashRouter;
};
export default getRouter;
