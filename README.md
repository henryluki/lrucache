# lrucache
LRUCache for javascript


##Init##
```Javascript
  CommonJS:

  var cache = require('./lrucache').create({capacity: 10}) # create({capacity: X})

  Script:

  <script type="text/javascript" src="lrucache.js"></script>
  var lrucache = LRUCache({capacity: 10});

```

##Methods##

###get(key)###
returns the item associated with specified key or undefined if key is not present in the cache.
Also updates the last accessed priority for the specified item, making it the most recently used one.

###set(key, value)###
Adds specified key, value pair to the cache. Causes the Least recently item to be discarded if the cache is at its capacity.
If the specified key is already present in cache, then the corresponding value is updated(overwritten) and the access priority is updated for the given key, making it the most recently used item.

###remove(key)###
Removes specified item from the cache, reducing occupancy by 1. Doesnt do anything if the key specified is not present in the cache


##Example##
```Javascript
    var cache = require('./lrucache').create({capacity: 10}) // Create a LRUCache with capacity equals to 10

    cache.set("a", 1)
    cache.set("b", 2)
    cache.set("c", 3)
    console.log(cache.get("a"))
    console.log(cache.remove("a"))
    console.log(cache.length)
    console.log(cache.capacity)

```

