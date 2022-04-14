import { AbstractStrategy } from "./AbstractStrategy";
import { Node } from "./Node";

export class BellmanFordStrategy extends AbstractStrategy {
  constructor() {
    super("Bellman Ford");
  }

  runPathfinding(source: Node, destination: Node): Node[] {
    return [];
  }
}
