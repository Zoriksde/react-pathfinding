import { COLUMNS, ROWS } from "../components/Visualizer";
import { PriorityQueue } from "../structures";
import { AbstractStrategy } from "./AbstractStrategy";
import { Node, NodeType } from "./Node";

export class BestFirstSearch extends AbstractStrategy {
  constructor() {
    super("Best First Search");
  }

  runPathfinding(source: Node, destination: Node): [Node[], number[], Node[]] {
    const parents: (Node | undefined)[][] = [];
    const visited: boolean[][] = [];
    const visitedNodes: Node[] = [];

    this.initContainers(parents, visited);

    const priorityQueue = new PriorityQueue();
    priorityQueue.push({ node: source, priority: 0 });
    parents[source.row][source.column] = source;
    visited[source.row][source.column] = true;

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
        if (
          visited[neighbour.row][neighbour.column] ||
          neighbour.nodeType === NodeType.PATH_WALL
        )
          return;

        parents[neighbour.row][neighbour.column] = currentNode;
        visited[neighbour.row][neighbour.column] = true;

        priorityQueue.push({
          node: neighbour,
          priority: this.getHeuristic(
            neighbour.row,
            neighbour.column,
            destination.row,
            destination.column
          ),
        });
      });
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

  // Manhattan distance heuristic
  private getHeuristic(
    nodeRow: number,
    nodeColumn: number,
    destinationRow: number,
    destinationColumn: number
  ): number {
    const rowsDifference = Math.abs(nodeRow - destinationRow);
    const columnsDifference = Math.abs(nodeColumn - destinationColumn);

    return rowsDifference + columnsDifference;
  }
}
