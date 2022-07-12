function Nodes(props) {
  this.$target = props.$target;

  this.template = () => {
    const prevHtml = `
      <div data-name = "prev" class="Node">
        <img src="./assets/prev.png">
      </div>
    `;

    const nodeHtml = props.directory
      .map((directoryItem) => {
        return `
          <div class ="Node" data-id = ${directoryItem.id} data-name = ${
          directoryItem.name
        } data-type = ${directoryItem.type} data-filepath = ${
          directoryItem.filePath
        }>
            <img src="./assets/${directoryItem.type.toLowerCase()}.png">
            <div>${directoryItem.name}</div>
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

  this.setEvent = () => {
    this.$target.addEventListener("click", (e) => {
      const target = e.target.closest(".Node");

      if (target) {
        const { id, name, type, filepath } = target.dataset;

        if (name === "prev") props.clickPrev();
        else if (type === "FILE" && filepath !== null)
          props.clickFile(filepath);
        else if (type === "DIRECTORY") props.clickDirectory({ id, name });
      }
    });
  };

  this.main = () => {
    this.render();
    this.setEvent();
  };

  this.main();
}

export default Nodes;
