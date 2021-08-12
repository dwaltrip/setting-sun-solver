import { find_path } from "dijkstrajs";

class Node {
  constructor(data) {
    this.data = data;
    this.edges = [];
  }
}

function transformToGraphForDjikstraJS(nodeLookup) {
  const keys = Object.keys(nodeLookup);
  const graph = {};
  for (const key of keys) {
    const node = nodeLookup[key];
    const edges = {};
    for (const edge of node.edges) {
      edges[edge.to.data.board.stringRepr] = 1;
    }
    graph[key] = edges;
  }
  return graph;
}

function findShortestPath(nodeLookup, source, target) {
  const graph = transformToGraphForDjikstraJS(nodeLookup);
  return find_path(transformToGraphForDjikstraJS(nodeLookup), source, target);
}

export { Node, findShortestPath };
