# Pathfinding Visualizer

Pathfinding Visualizer project that helps others to understand basic ideas behind pathfinding algorithms.
What's more the pathfinding algorithms aren't the ones which are implemented. There is also a capability to generate some basic maze patterns.
Project is written in ReactJS with Typescript with some CSS styling.

In case if you want to run it on your local machine clone this repositry and then put
```npm install``` on your command line.

If you would like to look at this project online [visit pathfinding visualizer](https://react-pathfinding.vercel.app/)

Project is written using OOP Principles and different Design Patterns, which makes it easy to maintain, extend, fix and change.
Each algorithm is implemented as single class which inherits from abstract one (Strategy Design Pattern).
The same concept is used in maze pattern generators algorithms.

Ex. of abstract strategy:

```ts 
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
```

Visualization is made with usage of custom hooks, css animation properties and setTimeout asynchronous function.
After some interval of time specified nodes are assigned to different type of animation properties.

Ex. of custom useVisualizer hook methods:

```ts
 visualizationNodes.forEach((pathNode, _i) => {
      setTimeout(() => {
        setVisualizationGrid((prevVisualizationGrid) => {
          const updatedVisualizationGrid = [...prevVisualizationGrid];
          if (pathNode === 0) currentNodeType = NodeType.PATH_VISUALIZED;
          else if (pathNode instanceof Node)
            updatedVisualizationGrid[pathNode.row][pathNode.column].setNodeType(
              currentNodeType
            );

          if (_i === visualizationNodes.length - 1) setIsLoading(false);
          return updatedVisualizationGrid;
        });
      }, 20 * _i);
    });
```

Ex. of css class animation properties:

```css
.visualized-node {
    background-color: #f3c069;
    animation-name: visualizedNode;
    animation-duration: 0.6s;
    animation-iteration-count: 1;
}
```

Algorithms that are covered here:

| Algorithm      | Guarantees Shortest Path | Heuristic (if any) |
| ----------- | ----------- | ----------- |
| Breadth First Search      | Yes       | None |
| Depth First Search      | No       | None |
| Dijkstra      | Yes       | None |
| Best First Search      | No       | Manhattan Distance |
| A*      | Yes       | Manhattan Distance |
| Randomized DFS      | No       | None |
| Bidirectional BFS      | Yes       | None |

Maze patterns that are covered here:

| Algorithm      | Description |
| ----------- | ----------- |
| Basic Random Maze | Picks randomly 25% of all nodes |
| Recursion Division | Recursively generate maze with one path or two paths |
| Random Walls | Recursively generate maze with several paths |
| Randomized DFS | Randomly picks next unvisited neighbour |

Project is written with main aim to help anyone who is interested in these topics. Enjoy playing around!
