import { AbstractStrategy } from "./AbstractStrategy";
import { Node } from "./Node";

export class DijkstraStrategy extends AbstractStrategy {
  constructor() {
    super("Dijkstra");
  }

  runPathfinding(source: Node, destination: Node): Node[] {
    return [];
  }
}
