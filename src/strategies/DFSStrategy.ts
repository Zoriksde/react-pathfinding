import { AbstractStrategy } from "./AbstractStrategy";
import { Node } from "./Node";

export class DFSStrategy extends AbstractStrategy {
  constructor() {
    super("Depth First Search");
  }

  runPathfinding(source: Node, destination: Node): Node[] {
    return [];
  }
}
