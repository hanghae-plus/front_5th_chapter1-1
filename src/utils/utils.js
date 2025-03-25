export const Router = (function () {
  const routes = {};
  const root = document.getElementById("root");
  const tab_nav = document.getElementById("nav_tab");

  function addRoute(path, component) {
    routes[path] = component;
  }

  function navigate(path) {
    console.log("path:", path);

    const component = routes[path] || routes["404"];
    root.innerHTML = component();
    if (tab_nav) {
      addEventListeners();
    }
  }

  function init() {
    /* 
        테스트 코드에서 
        const goTo = (path) => {
            window.history.pushState({}, "", path);
            window.dispatchEvent(new Event("popstate"));
        };
        으로 popstate 이벤트를 발생시키기 때문에 하단의 코드를 추가해서
        expect([...document.querySelectorAll("header")].length).toBe(0);
        이 부분의 에러를 방지해야 한다.
        */
    window.addEventListener("popstate", () => {
      navigate(window.location.pathname);
    });

    navigate(window.location.pathname || "/");
  }

  /* 탭 이동 */
  function addEventListeners() {
    tab_nav.addEventListener("click", (e) => {
      const target = e.target;
      if (target.tagName === "A" && !!target?.dataset?.path) {
        const path = target.dataset.path;
        history.pushState({}, "", path);
        navigate(path);
      }
    });
  }

  return {
    addRoute,
    navigate,
    init,
  };
})();

export class Store {
  constructor() {
    this.store = JSON.parse(localStorage.getItem("user")) || {};
  }
  set(key, value) {
    this.store[key] = value;
    this.save();
  }
  get(key) {
    return this.store[key];
  }
  save() {
    localStorage.setItem("user", JSON.stringify(this.store));
  }
}
