class LRUCache
  constructor: (options) ->
    @capacity = options["capacity"] || 10
    @length = 0
    @head = @tail = null
    @data = {}

  set: (key, value) ->
    if @get(key)
      @data[key].value = value
      @update_key(key)
    else
      node = @create_node(key, value)

      if @length >= @capacity
        @tail.newer.older = null
        @remove(@tail.key)
        @tail = @tail.newer

      @set_head(node)
      @data[key] = node
      @length += 1

  get:(key) ->
    if @data[key]
      @update_key(key)
      @data[key].value
    else
      null

  remove: (key) ->
    if @data[key]
      delete @data[key]
      @length -= 1

  create_node: (key, value)->
    { key: key, value: value, newer: null, older: null}

  update_key: (key) ->
    node = @data[key]

    if node.newer
      node.newer.older = node.older
    else
      @head = node.older
    if node.older
      node.older.newer = node.newer
    else
      @tail = node.newer

    @set_head(node)

  set_head: (node)->
    node.older = @head
    node.newer = null
    if @head
      @head.newer = node
    @head = node

    if !@tail
      @tail = node


module.exports = {
  create:(options)->
    new LRUCache(options)
}







