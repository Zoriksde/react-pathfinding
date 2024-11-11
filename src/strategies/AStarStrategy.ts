import { COLUMNS, ROWS } from "../components/Visualizer";
import { PriorityQueue } from "../structures";
import { AbstractStrategy } from "./AbstractStrategy";
import { Node, NodeType } from "./Node";

export class AStarStrategy extends AbstractStrategy {
  constructor() {
    super("A*");
  }

  runPathfinding(source: Node, destination: Node): [Node[], number[], Node[]] {
    const parents: (Node | undefined)[][] = [];
    const costs: number[][] = [];
    const visitedNodes: Node[] = [];

    this.initContainers(parents, costs);

    const priorityQueue = new PriorityQueue();
    priorityQueue.push({ node: source, priority: 0 });
    parents[source.row][source.column] = source;
    costs[source.row][source.column] = 0;

    while (!priorityQueue.isEmpty()) {
      const currentEntry = priorityQueue.poll();
      const currentNode = currentEntry.node;
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

      currentNode.neighbours.forEach((neighbour) => {
        if (neighbour.nodeType === NodeType.PATH_WALL) return;

        const currentCost = costs[currentNode.row][currentNode.column] + 1;
        if (currentCost < costs[neighbour.row][neighbour.column]) {
          parents[neighbour.row][neighbour.column] = currentNode;
          costs[neighbour.row][neighbour.column] = currentCost;
          if (!priorityQueue.contains(neighbour))
            priorityQueue.push({
              node: neighbour,
              priority:
                costs[neighbour.row][neighbour.column] +
                this.getHeuristic(
                  neighbour.row,
                  neighbour.column,
                  destination.row,
                  destination.column
                ),
            });
        }
      });
    }

    visitedNodes.shift();
    return [visitedNodes, [0], []];
  }

  private initContainers(
    parents: (Node | undefined)[][],
    costs: number[][]
  ): void {
    for (let row = 0; row < ROWS; row++) {
      parents.push([]);
      costs.push([]);

      for (let column = 0; column < COLUMNS; column++) {
        parents[row].push(undefined);
        costs[row].push(1e4);
      }
    }
  }

  // Manhattan distance heuristic
  private getHeuristic(
    nodeRow: number,
    nodeColumn: number,
    destinationRow: number,
    destinationColumn: number
  ): number {
    const rowsDifference = Math.abs(nodeRow - destinationRow);
    const columnsDifference = Math.abs(nodeColumn - destinationColumn);

    return Math.pow(rowsDifference + columnsDifference, 2);
  }
}
