import { AbstractStrategy } from "./AbstractStrategy";
import { Node } from "./Node";

export class AStarStrategy extends AbstractStrategy {
  constructor() {
    super("A*");
  }

  runPathfinding(source: Node, destination: Node): [Node[], Node[]] {
    return [[], []];
  }
}
