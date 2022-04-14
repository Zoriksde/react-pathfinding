import { COLUMNS, ROWS } from "../components/Visualizer";
import { Node } from "../strategies/Node";
import { AbstractGenerator } from "./AbstractGenerator";

export class BasicRandomMazeGenerator extends AbstractGenerator {
  constructor() {
    super("Basic Random Maze");
  }

  generate(grid: Node[][]): Node[] {
    const resultGrid: Node[] = [];
    const numberOfElements = Math.floor((ROWS * COLUMNS) / 6);

    for (let element = 0; element < numberOfElements; element++) {
      const currentRow = Math.floor(Math.random() * ROWS);
      const currentColumn = Math.floor(Math.random() * COLUMNS);
      resultGrid.push(grid[currentRow][currentColumn]);
    }

    return resultGrid;
  }
}
