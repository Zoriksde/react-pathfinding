import { AbstractStrategy } from "./AbstractStrategy";

export class AStarStrategy extends AbstractStrategy {
  constructor() {
    super("A*");
  }

  runPathfinding(source: Node, destination: Node): Node[] {
    return [];
  }
}
