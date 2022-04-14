import { Node } from "../strategies/Node";
import { AbstractGenerator } from "./AbstractGenerator";

export class RecursionDivisionGenerator extends AbstractGenerator {
  constructor() {
    super("Recursion Division");
  }

  generate(grid: Node[][]): Node[] {
    return [];
  }
}
