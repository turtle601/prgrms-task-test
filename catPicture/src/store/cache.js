function Cache() {
  const _cache = new Map();

  this.getCache = (id) => {
    return _cache.get(id);
  };

  this.setCache = (id, newData) => {
    _cache.set(id, newData);
  };
}

export default Cache;
