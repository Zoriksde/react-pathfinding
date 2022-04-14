import { Node } from "../strategies/Node";

export class AbstractGenerator {
  constructor(public name: string) {}

  generate(grid: Node[][]): Node[] {
    return [];
  }
}
