import { ROWS, COLUMNS } from "../components/Visualizer";
import { Node } from "../strategies/Node";
import { AbstractGenerator } from "./AbstractGenerator";
import {
  RecursionDivisionGenerator,
  RandomCriteria,
} from "./RecursionDivisionGenerator";

export class RandomWallsGenerator extends AbstractGenerator {
  private recursiveGenerator: RecursionDivisionGenerator;

  constructor() {
    super("Random Walls");
    this.recursiveGenerator = new RecursionDivisionGenerator();
  }

  generate(grid: Node[][]): Node[] {
    const resultGrid: Node[] = [];
    const innerWalls: Node[] = [];

    const outerWalls = this.recursiveGenerator.generateOuterWalls(grid);
    this.recursiveGenerator.generateInnerWalls(
      grid,
      false,
      this.recursiveGenerator.randomNumber(
        1,
        Math.floor(COLUMNS - 2) / 5,
        RandomCriteria.RANDOM_EVEN
      ),
      this.recursiveGenerator.randomNumber(
        (Math.floor(COLUMNS - 2) / 5) * 4,
        COLUMNS - 2,
        RandomCriteria.RANDOM_EVEN
      ),
      this.recursiveGenerator.randomNumber(
        1,
        Math.floor(ROWS - 2) / 5,
        RandomCriteria.RANDOM_EVEN
      ),
      this.recursiveGenerator.randomNumber(
        (Math.floor(ROWS - 2) / 5) * 4,
        ROWS - 2,
        RandomCriteria.RANDOM_EVEN
      ),
      innerWalls
    );

    outerWalls.forEach((outerWall) => resultGrid.push(outerWall));
    innerWalls.forEach((innerWall) => resultGrid.push(innerWall));

    return resultGrid;
  }
}
