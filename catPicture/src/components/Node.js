function Nodes(props) {
  this.$target = props.$target;
  this.directory = props.directory;

  console.log(this.directory);

  this.template = () => {
    const prevHtml = `
      <div data-name = "prev" class="Node">
        <img src="./assets/prev.png">
      </div>
    `;

    const nodeHtml = this.directory
      .map((d) => {
        return `
          <div class ="Node" data-id = ${d.id} data-name = ${
          d.name
        } data-type = ${d.type} data-filepath = ${d.filePath}>
            <img src="./assets/${d.type.toLowerCase()}.png">
            <div>${d.name}</div>
          </div>`;
      })
      .join("");

    return props.path.length > 1 ? prevHtml + nodeHtml : nodeHtml;
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
      const id = e.target.dataset.id || e.target.parentNode.dataset.id;
      const name = e.target.dataset.name || e.target.parentNode.dataset.name;
      const type = e.target.dataset.type || e.target.parentNode.dataset.type;
      const filePath =
        e.target.dataset.filepath || e.target.parentNode.dataset.filepath;

      if (name === "prev") props.clickPrev();
      else if (type === "FILE" && filePath !== null) props.clickFile(filePath);
      else props.clickDirectory({ id, name });
    });
  };

  this.main = () => {
    this.render();
    this.setEvent();
  };

  this.main();
}

export default Nodes;
