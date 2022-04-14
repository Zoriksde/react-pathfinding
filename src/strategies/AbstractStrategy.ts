import { Node } from "./Node";

export class AbstractStrategy {
  constructor(public name: string) {}

  runPathfinding(source: Node, destination: Node): Node[] {
    return [];
  }
}
