import { COLUMNS, ROWS } from "../components/Visualizer";
import { AbstractStrategy } from "./AbstractStrategy";
import { NodeType } from "./EventType";
import { Node } from "./Node";

export class BFSStrategy extends AbstractStrategy {
  constructor() {
    super("Breadth First Search");
  }

  runPathfinding(source: Node, destination: Node): [Node[], Node[]] {
    const queue = [source];
    const visited: boolean[][] = [];
    const parents: (Node | undefined)[][] = [];

    const visitedNodes: Node[] = [];

    for (let row = 0; row < ROWS; row++) {
      visited.push([]);
      parents.push([]);
      visited[row].fill(false, COLUMNS);
      parents[row].fill(undefined, COLUMNS);
    }

    visited[source.row][source.column] = true;
    parents[source.row][source.column] = source;

    while (queue.length > 0) {
      let currentNode = queue.shift();

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
        return [visitedNodes, resultPath];
      }

      currentNode?.neighbours.forEach((neighbour) => {
        if (
          !visited[neighbour.row][neighbour.column] &&
          neighbour.nodeType !== NodeType.PATH_WALL
        ) {
          visited[neighbour.row][neighbour.column] = true;
          parents[neighbour.row][neighbour.column] = currentNode;
          queue.push(neighbour);
        }
      });
    }

    visitedNodes.pop();
    visitedNodes.shift();
    return [visitedNodes, []];
  }
}
