import { getFileApi, getRootApi } from "./api/api.js";

// utils
import { getDom } from "./utils/dom.js";

// store
import Cache from "./store/cache.js";

// component
import Breadcrumb from "./components/Breadcrumb.js";
import Nodes from "./components/Node.js";
import ImageViewer from "./components/ImageView.js";
import Loading from "./components/Loading.js";

function App($target) {
  this.root = $target;

  this.state = {
    path: [],
    directory: [],
    loading: false,
  };

  this.cache = new Cache();

  this.template = () => {
    return `
      <nav class = "Breadcrumb"></nav>
      <div class = "Nodes"></div>
      <div class = "Modal-container"></div>
      <div class = "Loading-container"></div>
    `;
  };

  this.render = () => {
    this.root.innerHTML = this.template();

    new Breadcrumb({
      $target: getDom(".Breadcrumb"),
      path: this.state.path,
      clickTree: this.clickTree,
    });
    new Nodes({
      $target: getDom(".Nodes"),
      path: this.state.path,
      directory: this.state.directory,
      clickDirectory: this.clickDirectory,
      clickPrev: this.clickPrev,
      clickFile: this.clickFile,
    });

    new Loading({
      $target: getDom(".Loading-container"),
      loading: this.state.loading,
    });

    console.log(this.cache._cache);
  };

  this.setState = (newData) => {
    this.state = { ...this.state, ...newData };
    this.render();
  };

  this.mounted = async () => {
    this.setState({ loading: true });

    const rootData = await getRootApi();

    this.setState({
      loading: false,
      path: [{ id: "null", name: "root" }],
      directory: rootData,
    });

    this.cache.setCache("null", rootData);
  };

  this.main = async () => {
    await this.mounted();
  };

  this.clickDirectory = async ({ id, name }) => {
    if (this.cache.getCache(id)) {
      this.setState({
        path: [...this.state.path, { id, name }],
        directory: this.cache.getCache(id),
      });
    } else {
      this.setState({ loading: true });

      const fileData = await getFileApi(id);

      this.setState({
        loading: false,
        path: [...this.state.path, { id, name }],
        directory: fileData,
      });

      this.cache.setCache(id, fileData);
    }
  };

  this.clickPrev = async () => {
    const n = this.state.path.length;
    const { id } = this.state.path[n - 2];

    console.log(n, id);

    this.setState({
      path: this.state.path.slice(0, n - 1),
      directory: this.cache.getCache(id),
    });
  };

  this.clickFile = (filePath) => {
    new ImageViewer({
      $target: getDom(".Modal-container"),
      filePath: filePath,
    });
  };

  this.clickTree = (pathId) => {
    const { path } = this.state;
    let flag = 0;

    path.forEach((p, idx) => {
      if (p.id === pathId) flag = idx;
    });

    this.setState({
      path: path.filter((_, idx) => {
        return idx <= flag;
      }),

      directory: this.cache.getCache(pathId),
    });
  };

  // 실행
  this.main();
}

export default App;
