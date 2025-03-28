export const getLoginStatus = () => {
  return localStorage.getItem("user") !== null;
};
