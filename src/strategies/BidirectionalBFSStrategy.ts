import { COLUMNS, ROWS } from "../components/Visualizer";
import { AbstractStrategy } from "./AbstractStrategy";
import { Node, NodeType } from "./Node";

export class BidirectionalBFSStrategy extends AbstractStrategy {
  constructor() {
    super("Bidirectional BFS");
  }

  runPathfinding(source: Node, destination: Node): [Node[], number[], Node[]] {
    const sourceParents: (Node | undefined)[][] = [];
    const destinationParents: (Node | undefined)[][] = [];
    const sourceVisited: (Node | undefined)[][] = [];
    const destinationVisited: (Node | undefined)[][] = [];
    const visitedNodes: Node[] = [];

    this.initContainers(
      sourceParents,
      destinationParents,
      sourceVisited,
      destinationVisited
    );

    const sourceQueue: Node[] = [];
    const destinationQueue: Node[] = [];

    sourceQueue.push(source);
    sourceParents[source.row][source.column] = source;
    sourceVisited[source.row][source.column] = source;

    destinationQueue.push(destination);
    destinationParents[destination.row][destination.column] = destination;
    destinationVisited[destination.row][destination.column] = destination;

    visitedNodes.push(source);
    visitedNodes.push(destination);

    while (sourceQueue.length > 0 && destinationQueue.length > 0) {
      this.singleBFS(sourceQueue, sourceParents, sourceVisited, visitedNodes);
      this.singleBFS(
        destinationQueue,
        destinationParents,
        destinationVisited,
        visitedNodes
      );

      const intersectionNode = this.isIntersecting(
        sourceVisited,
        destinationVisited
      );

      if (intersectionNode !== undefined) {
        const sourcePath = this.reconstruthPath(
          sourceParents,
          intersectionNode,
          source
        );
        const destinationPath = this.reconstruthPath(
          destinationParents,
          intersectionNode,
          destination
        ).reverse();

        let resultPath = [...sourcePath];
        resultPath.push(intersectionNode);
        resultPath = [...resultPath, ...destinationPath];

        visitedNodes.shift();
        visitedNodes.shift();
        return [visitedNodes, [0], resultPath];
      }
    }

    visitedNodes.shift();
    visitedNodes.shift();
    return [visitedNodes, [0], []];
  }

  private initContainers(
    sourceParents: (Node | undefined)[][],
    destinationParents: (Node | undefined)[][],
    sourceVisited: (Node | undefined)[][],
    destinationVisited: (Node | undefined)[][]
  ): void {
    for (let row = 0; row < ROWS; row++) {
      sourceParents.push([]);
      destinationParents.push([]);
      sourceVisited.push([]);
      destinationVisited.push([]);

      for (let column = 0; column < COLUMNS; column++) {
        sourceParents[row].push(undefined);
        destinationParents[row].push(undefined);
        sourceVisited[row].push(undefined);
        destinationVisited[row].push(undefined);
      }
    }
  }

  private singleBFS(
    queue: Node[],
    parents: (Node | undefined)[][],
    visited: (Node | undefined)[][],
    visitedNodes: Node[]
  ): void {
    const currentNode = queue.shift();
    if (currentNode === undefined) return;

    currentNode.neighbours.forEach((neighbour) => {
      if (
        visited[neighbour.row][neighbour.column] !== undefined ||
        neighbour.nodeType === NodeType.PATH_WALL
      )
        return;
      parents[neighbour.row][neighbour.column] = currentNode;
      visited[neighbour.row][neighbour.column] = neighbour;

      visitedNodes.push(neighbour);
      queue.push(neighbour);
    });
  }

  private isIntersecting(
    sourceVisited: (Node | undefined)[][],
    destinationVisited: (Node | undefined)[][]
  ): Node | undefined {
    for (let row = 0; row < ROWS; row++) {
      for (let column = 0; column < COLUMNS; column++) {
        const currentSourceNode = sourceVisited[row][column];
        const currentDestinationNode = destinationVisited[row][column];

        if (
          currentSourceNode === undefined ||
          currentDestinationNode === undefined
        )
          continue;

        if (
          currentSourceNode.row === currentDestinationNode.row &&
          currentSourceNode.column === currentDestinationNode.column
        )
          return sourceVisited[row][column];
      }
    }

    return undefined;
  }
}
