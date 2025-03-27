const authMiddleware = (store) => {
  return function (context) {
    const { meta } = context;

    if (
      context?.path !== "login" &&
      meta?.requiresAuth &&
      !store.isLoggedIn()
    ) {
      context.redirect = "/login";
      return false;
    }

    if (context?.path !== "/" && meta?.guestOnly && store.isLoggedIn()) {
      context.redirect = "/";
      return false;
    }

    return true;
  };
};

export default authMiddleware;
