// Generated by CoffeeScript 1.7.1
var LRUCache;

LRUCache = (function() {
  function LRUCache(options) {
    this.capacity = options["capacity"] || 10;
    this.length = 0;
    this.head = this.tail = null;
    this.data = {};
  }

  LRUCache.prototype.set = function(key, value) {
    var node;
    if (this.get(key)) {
      this.data[key].value = value;
      return this.update_key(key);
    } else {
      node = this.create_node(key, value);
      if (this.length >= this.capacity) {
        this.tail.newer.older = null;
        this.remove(this.tail.key);
        this.tail = this.tail.newer;
      }
      this.set_head(node);
      this.data[key] = node;
      return this.length += 1;
    }
  };

  LRUCache.prototype.get = function(key) {
    if (this.data[key]) {
      this.update_key(key);
      return this.data[key].value;
    } else {
      return null;
    }
  };

  LRUCache.prototype.remove = function(key) {
    if (this.data[key]) {
      delete this.data[key];
      return this.length -= 1;
    }
  };

  LRUCache.prototype.create_node = function(key, value) {
    return {
      key: key,
      value: value,
      newer: null,
      older: null
    };
  };

  LRUCache.prototype.update_key = function(key) {
    var node;
    node = this.data[key];
    if (node.newer) {
      node.newer.older = node.older;
    } else {
      this.head = node.older;
    }
    if (node.older) {
      node.older.newer = node.newer;
    } else {
      this.tail = node.newer;
    }
    return this.set_head(node);
  };

  LRUCache.prototype.set_head = function(node) {
    node.older = this.head;
    node.newer = null;
    if (this.head) {
      this.head.newer = node;
    }
    this.head = node;
    if (!this.tail) {
      return this.tail = node;
    }
  };

  return LRUCache;

})();

if (typeof module !== 'undefined' && 'exports' in module) {
  module.exports = {
    create: function(options) {
      return new LRUCache(options);
    }
  };
}
