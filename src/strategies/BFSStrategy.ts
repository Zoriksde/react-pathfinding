import { AbstractStrategy } from "./AbstractStrategy";

export class BFSStrategy extends AbstractStrategy {
  constructor() {
    super("Breadth First Search");
  }

  runPathfinding(source: Node, destination: Node): Node[] {
    return [];
  }
}
