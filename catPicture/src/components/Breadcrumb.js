function Breadcrumb(props) {
  this.$target = props.$target;
  this.path = props.path;

  this.state = {};

  this.template = () => {
    return this.path
      .map((p) => {
        return `
          <div data-pathid = ${p.id}>${p.name}</div>
        `;
      })
      .join("");
  };

  this.render = () => {
    this.$target.innerHTML = this.template();
  };

  this.setEvent = () => {
    this.$target.addEventListener("click", (e) => {
      const { pathid } = e.target.dataset;
      console.log(pathid);
      props.clickTree(pathid);

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
