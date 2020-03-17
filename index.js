"use strict"

const data = require("./testData.js").data

class Graph {
  constructor(props) {
    this.neighbors = {}
  }

  addEdge(u, v) {
    if (!this.neighbors[u]) this.neighbors[u] = []
    this.neighbors[u].push(v)
    if (!this.neighbors[v]) this.neighbors[v] = []
    this.neighbors[v].push(u)
  }

  shortestPath(start, end) {
    if (start == end) {
      return [start, end]
    }

    var queue = [start],
        visited = {},
        predecessor = {},
        tail = 0,
        path

    while(tail < queue.length) {
      var u = queue[tail++]
      if (!this.neighbors[u]) {
        continue
      }

      var neighbors = this.neighbors[u]
      for(var i = 0; i < neighbors.length; ++i) {
        var v = neighbors[i]
        if (visited[v]) {
          continue
        }
        visited[v] = true
        if (v === end) {   // Check if the path is complete.
          path = [ v ]   // If so, backtrack through the path.
          while (u !== start) {
            path.push(u)
            u = predecessor[u]
          }
          path.push(u)
          path.reverse()
          return path
        }
        predecessor[v] = u
        queue.push(v)
      }
    }

    return path
  }
}

var createGraph = function() {
  var g = new Graph()
  g.addEdge(0, 1);
  g.addEdge(1, 2);
  g.addEdge(1, 13);
  g.addEdge(2, 3);
  g.addEdge(3, 4);
  g.addEdge(4, 5);
  g.addEdge(5, 6);
  g.addEdge(6, 7);
  g.addEdge(7, 8);
  g.addEdge(8, 9);
  g.addEdge(8, 14);
  g.addEdge(9, 10);
  g.addEdge(10, 11);
  g.addEdge(11, 12);
  g.addEdge(12, 13);
  g.addEdge(13, 16);
  g.addEdge(16, 15);
  g.addEdge(15, 14);
  return g
}

var paths = {}
var shortestPathGraph = createGraph()
for (var i = 1; i < 17; i++) {
  paths[i] = shortestPathGraph.shortestPath(0, i)
}
var sum = data.reduce(function (accumulator, value) {
    return value.time + accumulator;
})

data.forEach(function(family) {
  family.path = paths[family.caravan]
  family.time = paths[family.caravan].length
})
data.sort(function (a, b) {
  return a.time - b.time
})
data.reduce(function (accumulator, value) {
    return value.time + accumulator;
})

console.dir(data)