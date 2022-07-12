function ErrorComponent(props) {
  this.$target = props.$target;

  this.template = () => {
    return `
      <div style = "z-index:1;width:100%;height:20px;position:fixed;left:0;top:0;background-color:black;color:red;">
        서버로부터 데이터를 가져오지 못했습니다
      </div>
    `;
  };

  this.render = () => {
    this.$target.innerHTML = props.error ? this.template() : "";
  };

  this.main = () => {
    this.render();
  };

  this.main();
}

export default ErrorComponent;
