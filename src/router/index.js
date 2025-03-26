import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import store from "../store";

const router = () => {
  const routes = {
    "/": { component: Home },
    "/login": {
      component: Login,
      beforeEnter: () => {
        const { isLoggedIn } = store.getState();
        if (isLoggedIn) {
          // 돌아갈 페이지 URL 먼저 설정
          history.pushState(null, "", "/");
          return false;
        }
        return true;
      },
    },
    "/profile": {
      component: Profile,
      beforeEnter: () => {
        const { isLoggedIn } = store.getState();
        if (!isLoggedIn) {
          history.pushState(null, "", "/login");
          return false;
        }
        return true;
      },
    },
    404: { component: NotFound },
  };

  const getPath = () => {
    if (location.hash) {
      return location.hash.replace("#", "") || "/";
    }
    return location.pathname;
  };

  const navigate = (path) => {
    const route = routes[path] || routes["404"];

    // 라우터 가드 있을 때 처리
    if (route.beforeEnter && !route.beforeEnter()) {
      // URL이 이미 바뀌어있기 때문에 getPath 주소 가져오기
      navigate(getPath());
      return;
    }

    const { component } = route;
    // 각 컴포넌트에 init, render 만들어서 render 됬을 때 init으로 eventHandler 적용할 수 있게 수정
    const { init, render } = component();

    history.pushState(null, "", path);
    document.getElementById("root").innerHTML = render();
    init && init();
  };

  const init = () => {
    window.addEventListener("hashchange", () => {
      navigate(getPath());
    });

    window.addEventListener("popstate", () => {
      navigate(getPath());
    });

    // 이벤트가 한 번만 등록되면 되기때문에 Header에 따로 빼지 X
    document.body.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        if (e.defaultPrevented) return;

        e.preventDefault();
        const pathName = e.target.href.replace(location.origin, "");
        navigate(pathName);
      }
    });

    navigate(getPath());
  };

  return {
    init,
    navigate,
  };
};

export default router;
