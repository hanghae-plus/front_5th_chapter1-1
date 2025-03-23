import Layout from "../_components/layouts/Layout";
import initLinkNavigation from "./anchors";

const render = () => {
  const $root = document.getElementById("root");
  $root.innerHTML = Layout();
  initLinkNavigation();
};

export default render;
