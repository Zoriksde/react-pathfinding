import { AbstractStrategy } from "./AbstractStrategy";

export class DijkstraStrategy extends AbstractStrategy {
  constructor() {
    super("Dijkstra");
  }

  runPathfinding(source: Node, destination: Node): Node[] {
    return [];
  }
}
