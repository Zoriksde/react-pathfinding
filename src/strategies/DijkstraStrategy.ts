import { COLUMNS, ROWS } from "../components/Visualizer";
import { PriorityQueue } from "../structures";
import { AbstractStrategy } from "./AbstractStrategy";
import { Node, NodeType } from "./Node";

export class DijkstraStrategy extends AbstractStrategy {
  constructor() {
    super("Dijkstra");
  }

  runPathfinding(source: Node, destination: Node): [Node[], number[], Node[]] {
    const parents: (Node | undefined)[][] = [];
    const costs: number[][] = [];
    const visited: boolean[][] = [];
    const visitedNodes: Node[] = [];
    let intersectionNode = destination;

    this.initContainers(parents, costs, visited);

    const priorityQueue = new PriorityQueue();
    priorityQueue.push({ node: source, priority: 0 });
    parents[source.row][source.column] = source;
    costs[source.row][source.column] = 0;
    visited[source.row][source.column] = true;

    while (!priorityQueue.isEmpty()) {
      const currentEntry = priorityQueue.poll();
      const currentNode = currentEntry.node;
      visitedNodes.push(currentNode);
      intersectionNode = currentNode;

      if (
        currentNode.row === destination.row &&
        currentNode.column === destination.column
      )
        break;

      visited[currentNode.row][currentNode.column] = true;
      if (costs[currentNode.row][currentNode.column] < currentEntry.priority)
        continue;

      currentNode.neighbours.forEach((neighbour) => {
        if (
          visited[neighbour.row][neighbour.column] ||
          neighbour.nodeType === NodeType.PATH_WALL
        )
          return;

        const currentCost = costs[currentNode.row][currentNode.column] + 1;
        if (currentCost < costs[neighbour.row][neighbour.column]) {
          parents[neighbour.row][neighbour.column] = currentNode;
          costs[neighbour.row][neighbour.column] = currentCost;
          priorityQueue.push({ node: neighbour, priority: currentCost });
        }
      });
    }

    if (costs[destination.row][destination.column] === 1e4) {
      visitedNodes.shift();
      return [visitedNodes, [0], []];
    }

    const resultPath = this.reconstruthPath(parents, intersectionNode, source);
    visitedNodes.shift();
    visitedNodes.pop();
    return [visitedNodes, [0], resultPath];
  }

  private initContainers(
    parents: (Node | undefined)[][],
    costs: number[][],
    visited: boolean[][]
  ): void {
    for (let row = 0; row < ROWS; row++) {
      parents.push([]);
      costs.push([]);
      visited.push([]);

      for (let column = 0; column < COLUMNS; column++) {
        parents[row].push(undefined);
        costs[row].push(1e4);
        visited[row].push(false);
      }
    }
  }
}
