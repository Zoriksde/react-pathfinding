import { AbstractStrategy } from "./AbstractStrategy";

export class DFSStrategy extends AbstractStrategy {
  constructor() {
    super("Depth First Search");
  }

  runPathfinding(source: Node, destination: Node): Node[] {
    return [];
  }
}
