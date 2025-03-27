/**
 * @function App
 * @description 애플리케이션 진입점 함수, 라우터, 상태, 저장소를 바탕으로 페이지 렌더링과 이벤트 처리 로직을 설정합니다.
 * @param {Object} router - 라우팅을 담당하는 객체
 * @param {Object} store - 전역 상태를 관리하는 객체
 * @param {Object} storage - 사용자 정보를 저장하는 객체
 */

export const App = (router, store, storage) => {
  // 현재 경로와 상태에 따라 페이지 렌더링
  const render = () => {
    const path = router.getPath();
    const { loggedIn } = store.getState();

    if (path === "/login" && loggedIn) {
      router.push("/");
      return;
    }

    if (path === "/profile" && !loggedIn) {
      router.push("/login");
      return;
    }

    const $root = document.getElementById("root");
    const template = router.getTarget();
    $root.innerHTML = template();
  };

  // 폼 제출 시 사용자 로그인 또는 프로필 수정 처리
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const targetId = e.target.id;
    const formData = new FormData(e.target);

    if (targetId === "login-form") {
      const username = formData.get("username").trim();
      storage.set({ username, email: "", bio: "" });
      store.setState({
        user: storage.get(),
        loggedIn: true,
      });

      return;
    }

    if (targetId === "profile-form") {
      const username = formData.get("username").trim();
      const email = formData.get("email").trim();
      const bio = formData.get("bio").trim();
      storage.set({ username, email, bio });
      store.setState({
        user: storage.get(),
      });

      return;
    }
  };

  // 엥커 클릭 시 라우팅 또는 로그아웃 처리
  const handleAnchorClick = (e) => {
    const anchor = e.target.closest("a");
    if (anchor) {
      e.preventDefault();

      if (anchor.id === "logout") {
        handleLogout();
        return;
      }

      const path = anchor.href.replace(window.location.origin, "");
      router.push(path);
    }
  };

  // 로그아웃 처리: 상태 초기화 및 로그인 페이지로 리디렉션
  const handleLogout = () => {
    storage.reset();
    store.setState({
      user: storage.get(),
      loggedIn: false,
    });
    router.push("/login");
  };

  // 앱 초기화: 이벤트 리스너 등록 및 초기 렌더링 설정
  const init = () => {
    router.subscribe(render);
    store.subscribe(render);

    document.body.addEventListener("click", handleAnchorClick);
    document.body.addEventListener("submit", handleFormSubmit);

    render();
  };

  init();
};
