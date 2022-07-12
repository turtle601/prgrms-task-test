function ImageViewer(props) {
  this.$target = props.$target; //.Modal
  this.state = {
    modal: true,
  };

  this.template = () => {
    return `
      <div class="Modal">
        <div class="ImageViewer">
          <div class="content">
            <img src="https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public${props.filePath}">
          </div>
        </div>
      </div>
    `;
  };

  this.render = () => {
    const { modal } = this.state;

    if (modal) {
      this.$target.innerHTML = this.template();
    } else {
      this.$target.innerHTML = "";
    }
  };

  this.setState = (newData) => {
    this.state = { ...this.state, ...newData };
    this.render();
  };

  this.setEvent = () => {
    this.$target.addEventListener("click", (e) => {
      if (e.target.tagName !== "IMG") {
        this.setState({ modal: false });
      }
    });

    window.addEventListener("keydown", (e) => {
      const { modal } = this.state;

      if (e.key === "Escape" && modal) {
        this.setState({ modal: false });
      }
    });
  };

  this.main = () => {
    this.render();
    this.setEvent();
  };

  this.main();
}

export default ImageViewer;
