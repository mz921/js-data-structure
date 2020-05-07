

class Node {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.connectedEdges = [];
  }
}
class Edge {
  constructor(id, node1, node2, weight) {
    this.id = id;
    this.node1 = node1;
    this.node2 = node2;
    this.weight = weight;
  }
}

class SparseGraph {
  constructor(direction=false, nodes=[], edges=[]) {
    this.nodes = nodes;
    this.edges = edges;
    this.direction = direction;
    this.lastNodeID = 1;
    this.lastEdgeID = 1;
  }

  /**
   *
   * @param {Number} edgeID
   * @param {Number} nodeID
   */
  other(edgeID, nodeID) {
    // console.log(edgeID)
    let edge = this.edges[edgeID];
    if (edge.node1 === nodeID) return edge.node2;
    else return edge.node1;
  }

  /**
   *
   * @param {Number} node1
   * @param {Number} node2
   */

  hasEdge(node1, node2) {
    // 无论有向还是无向都成立
    node1 = this.nodes[node1];
    node2 = this.nodes[node2];
    node1.connectedEdges.forEach(edge => {
      if (this.other(edge, node1) === node2) return true;
    });
    return false;
  }

  addNode(x, y) {
    let id = this.lastNodeID;
    let node = new Node(id, x, y);
    this.nodes[id] = node;
    this.lastNodeID++;
  }

  /**
   *
   * @param {Number} node1
   * @param {Number} node2
   *
   */

  addEdge(node1, node2) {
    let id = this.lastEdgeID;
    let weight = Math.pow(
      Math.pow(this.nodes[node1].x - this.nodes[node2].x, 2) +
        Math.pow(this.nodes[node1].y - this.nodes[node2].y, 2),
      0.5
    );
    let edge = new Edge(id, node1, node2, weight);
    this.edges[id] = edge;
    this.nodes[node1].connectedEdges.push(this.lastEdgeID);
    // 无向图
    if (!this.direction) {
      this.nodes[node2].connectedEdges.push(this.lastEdgeID);
    }
    this.lastEdgeID++;
  }
}

// class DenseGraph {
//   constructor(v, e, direction) {
//     super(v, e, direction);
//     this.graphMatrix = [];
//     for (let i = 0; i < v; i++) {
//       this.graphMatrix.push([]);
//       for (let j = 0; j < v; j++) {
//         this.graphMatrix[i].push(false);
//       }
//     }
//   }
//   addEdge(v1, v2) {
//     assert(v1 >= 0 && v1 <= this.v);
//     assert(v2 >= 0 && v2 <= this.v);
//     if (this.hasEdge(v1, v2)) {
//       return;
//     }
//     this.graphMatrix[v1][v2] = true;
//     if (!this.direction) {
//       this.graphMatrix[v2][v1] = true;
//     }
//     this.e++;
//   }

//   hasEdge(v1, v2) {
//     assert(v1 >= 0 && v1 <= this.v);
//     assert(v2 >= 0 && v2 <= this.v);
//     return this.graphMatrix[v1][v2];
//   }
// }

module.exports = {
  Node,
  Edge,
  SparseGraph
};
