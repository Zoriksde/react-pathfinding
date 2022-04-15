import { COLUMNS, ROWS } from "../components/Visualizer";
import { Node } from "../strategies/Node";
import { AbstractGenerator } from "./AbstractGenerator";

enum RandomCriteria {
  RANDOM_EVEN,
  RANDOM_ODD,
}

export class RecursionDivisionGenerator extends AbstractGenerator {
  constructor() {
    super("Recursion Division");
  }

  generate(grid: Node[][]): Node[] {
    const resultGrid: Node[] = [];

    const outerWalls = this.generateOuterWalls(grid);
    const innerWalls: Node[] = [];

    this.generateInnerWalls(
      grid,
      true,
      1,
      COLUMNS - 2,
      1,
      ROWS - 2,
      innerWalls
    );

    outerWalls.forEach((outerWall) => resultGrid.push(outerWall));
    innerWalls.forEach((innerWall) => resultGrid.push(innerWall));

    return resultGrid;
  }

  private generateOuterWalls(grid: Node[][]): Node[] {
    const outerWalls: Node[] = [];

    for (let row = 0; row < ROWS; row++) {
      if (row === 0 || row === ROWS - 1) {
        for (let column = 0; column < COLUMNS; column++) {
          outerWalls.push(grid[row][column]);
        }
      } else {
        outerWalls.push(grid[row][0]);
        outerWalls.push(grid[row][COLUMNS - 1]);
      }
    }

    return outerWalls;
  }

  private generateInnerWalls(
    grid: Node[][],
    horizontalDivision: boolean = true,
    columnMin: number,
    columnMax: number,
    rowMin: number,
    rowMax: number,
    resultGrid: Node[]
  ): void {
    if (horizontalDivision) {
      if (columnMax - columnMin < 2) return;

      const currentHorizontalRow = this.randomNumber(
        rowMin,
        rowMax,
        RandomCriteria.RANDOM_EVEN
      );

      this.addHorizontalWalls(
        grid,
        columnMin,
        columnMax,
        currentHorizontalRow,
        resultGrid
      );

      this.generateInnerWalls(
        grid,
        !horizontalDivision,
        columnMin,
        columnMax,
        rowMin,
        currentHorizontalRow - 1,
        resultGrid
      );

      this.generateInnerWalls(
        grid,
        !horizontalDivision,
        columnMin,
        columnMax,
        currentHorizontalRow + 1,
        rowMax,
        resultGrid
      );
    } else {
      if (rowMax - rowMin < 2) return;

      const currentVerticalColumn = this.randomNumber(
        columnMin,
        columnMax,
        RandomCriteria.RANDOM_EVEN
      );

      this.addVerticalWalls(
        grid,
        rowMin,
        rowMax,
        currentVerticalColumn,
        resultGrid
      );

      this.generateInnerWalls(
        grid,
        !horizontalDivision,
        columnMin,
        currentVerticalColumn - 1,
        rowMin,
        rowMax,
        resultGrid
      );

      this.generateInnerWalls(
        grid,
        !horizontalDivision,
        currentVerticalColumn + 1,
        columnMax,
        rowMin,
        rowMax,
        resultGrid
      );
    }
  }

  private randomNumber(
    min: number,
    max: number,
    criteria: RandomCriteria
  ): number {
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    if (criteria === RandomCriteria.RANDOM_EVEN && randomNumber % 2 !== 0) {
      return randomNumber === min ? randomNumber + 1 : randomNumber - 1;
    } else if (
      criteria === RandomCriteria.RANDOM_ODD &&
      randomNumber % 2 === 0
    ) {
      return randomNumber === min ? randomNumber + 1 : randomNumber - 1;
    }

    return randomNumber;
  }

  private addHorizontalWalls(
    grid: Node[][],
    columnMin: number,
    columnMax: number,
    currentRow: number,
    resultGrid: Node[]
  ): void {
    const newHole = this.randomNumber(
      columnMin,
      columnMax,
      RandomCriteria.RANDOM_ODD
    );

    for (let column = columnMin; column <= columnMax; column++) {
      if (newHole === column) continue;
      resultGrid.push(grid[currentRow][column]);
    }
  }

  private addVerticalWalls(
    grid: Node[][],
    rowMin: number,
    rowMax: number,
    currentColumn: number,
    resultGrid: Node[]
  ): void {
    const newHole = this.randomNumber(
      rowMin,
      rowMax,
      RandomCriteria.RANDOM_ODD
    );

    for (let row = rowMin; row <= rowMax; row++) {
      if (newHole === row) continue;
      resultGrid.push(grid[row][currentColumn]);
    }
  }
}
