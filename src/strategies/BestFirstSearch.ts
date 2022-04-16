import { COLUMNS, ROWS } from "../components/Visualizer";
import { PQType, PriorityQueue } from "../structures";
import { AbstractStrategy } from "./AbstractStrategy";
import { NodeType } from "./EventType";
import { Node } from "./Node";

export class BestFirstSearch extends AbstractStrategy {
  constructor() {
    super("Best First Search");
  }

  runPathfinding(source: Node, destination: Node): [Node[], Node[]] {
    const visited: boolean[][] = [];
    const parents: (Node | undefined)[][] = [];

    const priorityQueue = new PriorityQueue(PQType.MAX);
    priorityQueue.push({ node: source, priority: 0 });

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

    while (!priorityQueue.isEmpty()) {
      const currentEntry = priorityQueue.poll();
      let currentNode: Node | undefined = currentEntry.node;

      visitedNodes.push(currentNode);

      if (
        currentNode.row === destination.row &&
        currentNode.column === destination.column
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

      currentNode.neighbours.forEach((neighbour) => {
        if (
          visited[neighbour.row][neighbour.column] ||
          neighbour.nodeType === NodeType.PATH_WALL
        )
          return;

        visited[neighbour.row][neighbour.column] = true;
        parents[neighbour.row][neighbour.column] = currentNode;
        priorityQueue.push({ node: neighbour, priority: 1 });
      });
    }

    visitedNodes.pop();
    visitedNodes.shift();
    return [visitedNodes, []];
  }
}
