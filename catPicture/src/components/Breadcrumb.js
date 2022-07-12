function Breadcrumb(props) {
  this.$target = props.$target;

  this.template = () => {
    return props.path
      .map((pathItem) => {
        return `
          <div class = "path" data-pathid = ${pathItem.id}>${pathItem.name}</div>
        `;
      })
      .join("");
  };

  this.render = () => {
    this.$target.innerHTML = this.template();
  };

  this.setEvent = () => {
    this.$target.addEventListener("click", (e) => {
      if (e.target.className === "path") {
        const { pathid } = e.target.dataset;
        props.clickTree(pathid);
      }
    });
  };

  this.main = () => {
    this.render();
    this.setEvent();
  };

  this.main();
}

export default Breadcrumb;
