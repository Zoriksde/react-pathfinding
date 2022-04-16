import { COLUMNS, ROWS } from "../components/Visualizer";
import { PriorityQueue } from "../structures";
import { AbstractStrategy } from "./AbstractStrategy";
import { NodeType } from "./EventType";
import { Node } from "./Node";

export class DijkstraStrategy extends AbstractStrategy {
  constructor() {
    super("Dijkstra");
  }

  runPathfinding(source: Node, destination: Node): [Node[], Node[]] {
    const distances: number[][] = [];
    const visited: boolean[][] = [];
    const parents: (Node | undefined)[][] = [];

    const visitedNodes: Node[] = [];

    const priorityQueue = new PriorityQueue();
    priorityQueue.push({ node: source, priority: 0 });

    for (let row = 0; row < ROWS; row++) {
      distances.push([]);
      visited.push([]);
      parents.push([]);

      for (let column = 0; column < COLUMNS; column++) {
        visited[row].push(false);
        distances[row].push(1e4);
        parents[row].push(undefined);
      }
    }

    visited[source.row][source.column] = true;
    distances[source.row][source.column] = 0;

    while (!priorityQueue.isEmpty()) {
      const currentEntry = priorityQueue.poll();
      const currentNode = currentEntry.node;
      visitedNodes.push(currentNode);

      if (
        currentNode.row === destination.row &&
        currentNode.column === destination.column
      )
        break;

      visited[currentNode.row][currentNode.column] = true;
      if (
        distances[currentNode.row][currentNode.column] < currentEntry.priority
      )
        continue;

      currentNode.neighbours.forEach((neighbour) => {
        if (
          visited[neighbour.row][neighbour.column] ||
          neighbour.nodeType === NodeType.PATH_WALL
        )
          return;
        const currentDistance =
          distances[currentNode.row][currentNode.column] + 1;
        if (currentDistance < distances[neighbour.row][neighbour.column]) {
          distances[neighbour.row][neighbour.column] = currentDistance;
          parents[neighbour.row][neighbour.column] = currentNode;
          priorityQueue.push({ node: neighbour, priority: currentDistance });
        }
      });
    }

    if (distances[destination.row][destination.column] === 1e4) {
      visitedNodes.shift();
      return [visitedNodes, []];
    }

    const resultPath: Node[] = [];
    let currentNode: Node | undefined =
      parents[destination.row][destination.column];

    while (currentNode !== undefined) {
      resultPath.unshift(currentNode);
      currentNode = parents[currentNode.row][currentNode.column];
    }

    resultPath.shift();

    visitedNodes.pop();
    visitedNodes.shift();
    return [visitedNodes, resultPath];
  }
}
