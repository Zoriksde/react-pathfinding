import { COLUMNS, ROWS } from "../components/Visualizer";
import { PriorityQueue } from "../structures";
import { AbstractStrategy } from "./AbstractStrategy";
import { Node, NodeType } from "./Node";

export class BestFirstSearch extends AbstractStrategy {
  constructor() {
    super("Best First Search");
  }

  runPathfinding(source: Node, destination: Node): [Node[], number[], Node[]] {
    const visited: boolean[][] = [];
    const parents: (Node | undefined)[][] = [];

    const priorityQueue = new PriorityQueue();
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
        return [visitedNodes, [0], resultPath];
      }

      currentNode.neighbours.forEach((neighbour) => {
        if (
          visited[neighbour.row][neighbour.column] ||
          neighbour.nodeType === NodeType.PATH_WALL
        )
          return;

        visited[neighbour.row][neighbour.column] = true;
        parents[neighbour.row][neighbour.column] = currentNode;
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
