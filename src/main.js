import router from "./router/index";
// import store from "./store/index";

const appRouter = router();

// store.subscribe(() => {
//   const path = location.hash.slice(1) || "/";
//   appRouter.navigate(path);
// });

appRouter.init();
