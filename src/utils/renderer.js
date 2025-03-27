const Renderer = (function () {
  function render({ component }) {
    document.getElementById("root").innerHTML = component;
  }

  return { render };
})();

export default Renderer;
