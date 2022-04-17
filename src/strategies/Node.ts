export enum NodeType {
  PATH_SOURCE,
  PATH_DESTINATION,
  PATH_WALL,
  PATH_UNUSED,
  PATH_VISUALIZED,
  PATH_VISITED,
}

export class Node {
  public neighbours: Node[];
  public nodeType: NodeType;

  constructor(public row: number, public column: number) {
    this.neighbours = [];
    this.nodeType = NodeType.PATH_UNUSED;
  }

  addNeighbour(neighbour: Node): void {
    this.neighbours.push(neighbour);
  }

  setNodeType(value: NodeType): void {
    this.nodeType = value;
  }
}
