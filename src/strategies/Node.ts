import { NodeType } from "./EventType";

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
