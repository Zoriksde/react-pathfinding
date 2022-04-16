import { COLUMNS, ROWS } from "../components/Visualizer";
import { AbstractStrategy } from "./AbstractStrategy";
import { NodeType } from "./EventType";
import { Node } from "./Node";

export class DFSStrategy extends AbstractStrategy {
  constructor() {
    super("Depth First Search");
  }

  runPathfinding(source: Node, destination: Node): [Node[], Node[]] {
    const stack = [source];
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
        return [visitedNodes, resultPath];
      }

      currentNode?.neighbours.forEach((neighbour) => {
        if (
          !visited[neighbour.row][neighbour.column] &&
          neighbour.nodeType !== NodeType.PATH_WALL
        ) {
          visited[neighbour.row][neighbour.column] = true;
          parents[neighbour.row][neighbour.column] = currentNode;
          stack.push(neighbour);
        }
      });
    }

    visitedNodes.shift();
    return [visitedNodes, []];
  }
}
