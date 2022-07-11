import { getFileApi, getRootApi } from "./api/api.js";

// utils
import { getDom } from "./utils/dom.js";

// component
import Breadcrumb from "./components/Breadcrumb.js";
import Nodes from "./components/Node.js";
import ImageViewer from "./components/ImageView.js";

function App($target) {
  this.root = $target;
  this.state = {
    path: [{ id: null, name: "root" }],
    directory: [],
  };

  this.template = () => {
    return `
      <nav class = "Breadcrumb"></nav>
      <div class = "Nodes"></div>
      <div class = "Modal-container"></div>
    `;
  };

  this.render = () => {
    this.root.innerHTML = this.template();

    new Breadcrumb({ $target: getDom(".Breadcrumb"), path: this.state.path });
    new Nodes({
      $target: getDom(".Nodes"),
      path: this.state.path,
      directory: this.state.directory,
      clickDirectory: this.clickDirectory,
      clickPrev: this.clickPrev,
      clickFile: this.clickFile,
    });
  };

  this.setState = (newData) => {
    this.state = { ...this.state, ...newData };
    this.render();
  };

  this.mounted = async () => {
    this.setState({ ...this.state, directory: await getRootApi() });
  };

  this.main = async () => {
    await this.mounted();
  };

  this.clickDirectory = async ({ id, name }) => {
    this.setState({ path: [...this.state.path, { id, name }] });
    this.setState({ directory: await getFileApi(id) });
  };

  this.clickPrev = async () => {
    const n = this.state.path.length;
    const { id } = this.state.path[n - 2];

    if (n <= 2) {
      this.setState({
        ...this.state,
        path: [{ id: null, name: "root" }],
        directory: await getRootApi(),
      });
    } else {
      this.setState({
        ...this.state,
        path: this.state.path.slice(0, n - 1),
        directory: await getFileApi(id),
      });
    }
  };

  this.clickFile = (filePath) => {
    new ImageViewer({
      $target: getDom(".Modal-container"),
      filePath: filePath,
    });
  };

  // 실행
  this.main();
}

export default App;
