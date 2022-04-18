import { COLUMNS, ROWS } from "../components/Visualizer";
import { Node, NodeType } from "../strategies";
import { AbstractGenerator } from "./AbstractGenerator";

export class RandomizedDFSGenerator extends AbstractGenerator {
  constructor() {
    super("Randomized DFS");
  }

  generate(grid: Node[][]): Node[] {
    const visited: boolean[][] = [];

    const maxPathLength = COLUMNS / 2 + ROWS / 2;
    const startNodes = ROWS / 4;

    let visitedNodes: Node[] = [];

    for (let row = 0; row < ROWS; row++) {
      visited.push([]);

      for (let column = 0; column < COLUMNS; column++) {
        visited[row].push(false);
      }
    }

    for (let startNode = 0; startNode < startNodes; startNode++) {
      const randomNode =
        grid[this.randomNumber(0, ROWS - 1)][this.randomNumber(0, COLUMNS - 1)];

      visitedNodes = [
        ...visitedNodes,
        ...this.singleDFS(randomNode, visited, maxPathLength),
      ];
    }

    return visitedNodes;
  }

  private singleDFS(
    node: Node,
    visited: boolean[][],
    maxPathLength: number
  ): Node[] {
    const stack = [node];
    const visitedNodes: Node[] = [];
    let pathLength = 1;
    visited[node.row][node.column] = true;

    while (stack.length > 0) {
      const currentNode = stack.pop();
      pathLength++;
      if (currentNode) visitedNodes.push(currentNode);

      if (pathLength > maxPathLength) {
        return visitedNodes;
      }

      let currentNeighbours: Node[] = [];
      currentNode?.neighbours.forEach((neighbour) => {
        if (
          visited[neighbour.row][neighbour.column] ||
          neighbour.nodeType === NodeType.PATH_WALL
        )
          return;
        visited[neighbour.row][neighbour.column] = true;
        currentNeighbours.push(neighbour);
      });

      while (currentNeighbours.length > 0) {
        const randomNeighbour = this.randomNeighbour(currentNeighbours.length);
        stack.push(currentNeighbours[randomNeighbour]);
        currentNeighbours = currentNeighbours.filter(
          (_, _i) => _i !== randomNeighbour
        );
      }
    }

    return visitedNodes;
  }

  private randomNeighbour(neighbours: number): number {
    return Math.floor(Math.random() * neighbours);
  }

  private randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
