import { AbstractStrategy } from "./AbstractStrategy";

export class BellmanFordStrategy extends AbstractStrategy {
  constructor() {
    super("Bellman Ford");
  }

  runPathfinding(source: Node, destination: Node): Node[] {
    return [];
  }
}
