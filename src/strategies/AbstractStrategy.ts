import { Node } from "./Node";

export class AbstractStrategy {
  constructor(public name: string) {}

  runPathfinding(source: Node, destination: Node): [Node[], number[], Node[]] {
    return [[], [], []];
  }

  protected reconstruthPath(
    parents: (Node | undefined)[][],
    currentNode: Node,
    source: Node
  ): Node[] {
    const resultPath: Node[] = [];
    let node: Node | undefined = currentNode;

    while (node !== source && node !== undefined) {
      resultPath.unshift(node);
      if (node !== undefined) node = parents[node.row][node.column];
    }

    resultPath.pop();
    return resultPath;
  }
}
