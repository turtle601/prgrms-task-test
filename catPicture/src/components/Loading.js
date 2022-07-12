function Loading(props) {
  this.$target = props.$target;

  this.template = () => {
    return `
      <div class="Modal">
        <div class="ImageViewer">
          <div class="content">
            <img src="../../assets/nyan-cat.gif" >
          </div>
        </div>
      </div>
    `;
  };
  this.render = () => {
    this.$target.innerHTML = props.loading ? this.template() : "";
  };

  this.main = () => {
    this.render();
  };

  this.main();
}

export default Loading;
