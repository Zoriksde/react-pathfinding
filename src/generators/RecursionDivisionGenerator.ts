import { COLUMNS, ROWS } from "../components/Visualizer";
import { Node } from "../strategies/Node";
import { AbstractGenerator } from "./AbstractGenerator";

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
      ROWS - 1,
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
    horizontal: boolean = true,
    columnMin: number,
    columnMax: number,
    rowMin: number,
    rowMax: number,
    resultGrid: Node[]
  ): void {
    if (horizontal) {
      if (columnMax - columnMin < 2) return;
      const randomHorizontalRow =
        Math.floor(this.randomNumber(rowMin, rowMax) / 2) * 2;
      this.addHorizontalWalls(
        grid,
        columnMin,
        columnMax,
        randomHorizontalRow,
        resultGrid
      );

      this.generateInnerWalls(
        grid,
        !horizontal,
        columnMin,
        columnMax,
        rowMin,
        randomHorizontalRow - 1,
        resultGrid
      );

      this.generateInnerWalls(
        grid,
        !horizontal,
        columnMin,
        columnMax,
        randomHorizontalRow + 1,
        rowMax,
        resultGrid
      );
    } else {
      if (rowMax - rowMin < 2) return;
      const randomHorizontalColumn =
        Math.floor(this.randomNumber(columnMin, columnMax) / 2) * 2;
      this.addVerticalWalls(
        grid,
        rowMin,
        rowMax,
        randomHorizontalColumn,
        resultGrid
      );

      this.generateInnerWalls(
        grid,
        !horizontal,
        columnMin,
        randomHorizontalColumn - 1,
        rowMin,
        rowMax,
        resultGrid
      );

      this.generateInnerWalls(
        grid,
        !horizontal,
        randomHorizontalColumn + 1,
        columnMax,
        rowMin,
        rowMax,
        resultGrid
      );
    }
  }

  private randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private addHorizontalWalls(
    grid: Node[][],
    columnMin: number,
    columnMax: number,
    currentRow: number,
    resultGrid: Node[]
  ): void {
    const newHole =
      Math.floor(this.randomNumber(columnMin, columnMax) / 2) * 2 + 1;

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
    const newHole = Math.floor(this.randomNumber(rowMin, rowMax) / 2) * 2 + 1;

    for (let row = rowMin; row <= rowMax; row++) {
      if (newHole === row) continue;
      resultGrid.push(grid[row][currentColumn]);
    }
  }
}
