function Cache() {
  this._cache = new Map();

  this.getCache = (id) => {
    return this._cache.get(id);
  };

  this.setCache = (id, newData) => {
    this._cache.set(id, newData);
  };
}

export default Cache;
