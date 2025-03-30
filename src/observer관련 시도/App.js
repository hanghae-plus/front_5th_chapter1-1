import Router from "./routes/router";

export const App = () => {
  const PageComponent = Router.getComponent();
  return PageComponent;
};
