class Error {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  render = () => {
    this.view.render();
  };
}

export default Error;
