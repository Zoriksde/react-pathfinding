import { COLUMNS, ROWS } from "../components/Visualizer";
import { AbstractStrategy } from "./AbstractStrategy";
import { Node, NodeType } from "./Node";

export class RandomizedDFSStrategy extends AbstractStrategy {
  constructor() {
    super("Randomized DFS");
  }

  runPathfinding(source: Node, destination: Node): [Node[], number[], Node[]] {
    const parents: (Node | undefined)[][] = [];
    const visited: boolean[][] = [];
    const visitedNodes: Node[] = [];

    this.initContainers(parents, visited);

    const stack: Node[] = [];
    stack.push(source);
    parents[source.row][source.column] = source;
    visited[source.row][source.column] = true;

    while (stack.length > 0) {
      const currentNode = stack.pop();
      if (currentNode === undefined) return [visitedNodes, [0], []];

      visitedNodes.push(currentNode);

      if (
        currentNode.row === destination.row &&
        currentNode.column === destination.column
      ) {
        const resultPath = this.reconstruthPath(parents, currentNode, source);

        visitedNodes.pop();
        visitedNodes.shift();
        return [visitedNodes, [0], resultPath];
      }

      let currentNeighbours: Node[] = [];

      currentNode.neighbours.forEach((neighbour) => {
        if (
          visited[neighbour.row][neighbour.column] ||
          neighbour.nodeType === NodeType.PATH_WALL
        )
          return;
        parents[neighbour.row][neighbour.column] = currentNode;
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

    visitedNodes.shift();
    return [visitedNodes, [0], []];
  }

  private initContainers(
    parents: (Node | undefined)[][],
    visited: boolean[][]
  ): void {
    for (let row = 0; row < ROWS; row++) {
      parents.push([]);
      visited.push([]);

      for (let column = 0; column < COLUMNS; column++) {
        parents[row].push(undefined);
        visited[row].push(false);
      }
    }
  }

  private randomNeighbour(neighbours: number): number {
    return Math.floor(Math.random() * neighbours);
  }
}
