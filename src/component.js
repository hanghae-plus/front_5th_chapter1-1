class Component {
  constructor() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    const root = document.getElementById("root");
    root.innerHTML = this.template();
  }

  attachEventListeners() {}

  template() {}
}

export default Component;
