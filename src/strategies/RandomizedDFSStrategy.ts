import { COLUMNS, ROWS } from "../components/Visualizer";
import { AbstractStrategy } from "./AbstractStrategy";
import { Node, NodeType } from "./Node";

export class RandomizedDFSStrategy extends AbstractStrategy {
  constructor() {
    super("Randomized DFS");
  }

  runPathfinding(source: Node, destination: Node): [Node[], number[], Node[]] {
    const stack = [source];
    const visited: boolean[][] = [];
    const parents: (Node | undefined)[][] = [];

    const visitedNodes: Node[] = [];

    for (let row = 0; row < ROWS; row++) {
      visited.push([]);
      parents.push([]);

      for (let column = 0; column < COLUMNS; column++) {
        visited[row].push(false);
        parents[row].push(undefined);
      }
    }

    visited[source.row][source.column] = true;
    parents[source.row][source.column] = source;

    while (stack.length > 0) {
      let currentNode = stack.pop();

      if (currentNode !== undefined) visitedNodes.push(currentNode);

      if (
        currentNode?.row === destination.row &&
        currentNode?.column === destination.column
      ) {
        const resultPath: Node[] = [];

        while (currentNode !== source && currentNode !== undefined) {
          resultPath.unshift(currentNode);
          currentNode = parents[currentNode.row][currentNode.column];
        }

        resultPath.pop();
        visitedNodes.pop();
        visitedNodes.shift();
        return [visitedNodes, [0], resultPath];
      }

      let currentNeighbours: Node[] = [];

      currentNode?.neighbours.forEach((neighbour) => {
        if (
          !visited[neighbour.row][neighbour.column] &&
          neighbour.nodeType !== NodeType.PATH_WALL
        ) {
          visited[neighbour.row][neighbour.column] = true;
          parents[neighbour.row][neighbour.column] = currentNode;
          currentNeighbours.push(neighbour);
        }
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

  private randomNeighbour(neighbours: number): number {
    return Math.floor(Math.random() * neighbours);
  }
}
