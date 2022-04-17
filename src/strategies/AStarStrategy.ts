import { COLUMNS, ROWS } from "../components/Visualizer";
import { PriorityQueue } from "../structures";
import { AbstractStrategy } from "./AbstractStrategy";
import { Node, NodeType } from "./Node";

export class AStarStrategy extends AbstractStrategy {
  constructor() {
    super("A*");
  }

  runPathfinding(source: Node, destination: Node): [Node[], Node[]] {
    const parents: (Node | undefined)[][] = [];
    const visited: boolean[][] = [];

    const visitedNodes: Node[] = [];

    const priorityQueue = new PriorityQueue();
    priorityQueue.push({ node: source, priority: 0 });

    for (let row = 0; row < ROWS; row++) {
      visited.push([]);
      parents.push([]);

      for (let column = 0; column < COLUMNS; column++) {
        visited[row].push(false);
        parents[row].push(undefined);
      }
    }

    parents[source.row][source.column] = source;
    visited[source.row][source.column] = true;

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
    return [visitedNodes, []];
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
