// 라우터 모드 설정을 관리하는 모듈
const routeConfig = (function () {
  let mode = "history";

  const setMode = (newMode) => {
    mode = newMode;
  };

  const getMode = () => mode;

  return {
    setMode,
    getMode,
  };
})();

export default routeConfig;
