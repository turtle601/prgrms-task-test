function Breadcrumb(props) {
  this.$target = props.$target;
  this.path = props.path;

  this.state = {};

  this.template = () => {
    return this.path
      .map((p) => {
        return `
          <div data-path = ${p.name}>${p.name}</div>
        `;
      })
      .join("");
  };

  this.render = () => {
    this.$target.innerHTML = this.template();
  };

  this.setState = (newData) => {
    this.setState({ ...this.state, ...newData });
    this.render();
  };

  this.mounted = () => {};

  this.setEvent = () => {
    this.$target.addEventListener("click", (e) => {
      console.log(e.target.dataset);
      console.log(e.target.dataset.path);

      // 해당 path에 따라 데이터 제렌더링
    });
  };

  this.main = () => {
    this.render();
    this.setEvent();
  };

  this.main();
}

export default Breadcrumb;
