function ImageViewer(props) {
  this.$target = props.$target; //.Modal
  this.state = {};

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
    this.$target.innerHTML = this.template();
  };

  this.setState = () => {};

  this.mounted = () => {};

  this.setEvent = () => {};

  this.main = () => {
    this.render();
  };

  this.main();
}

export default ImageViewer;
