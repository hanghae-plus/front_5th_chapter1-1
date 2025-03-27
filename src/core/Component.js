export class Component {
  constructor($target, props = {}) {
    this.$target = $target;
    this.props = props;
    this.render();
  }

  template() {
    return "";
  }

  setEvent() {}

  render() {
    this.$target.innerHTML = this.template();
    this.setEvent();
  }
}
