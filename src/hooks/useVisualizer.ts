import { useCallback, useEffect, useState } from "react";
import { AbstractGenerator } from "../generators";
import { AbstractStrategy } from "../strategies";
import { Node, NodeType } from "../strategies";
import { AbstractEventType, EventType } from "../events";
import { AbstractOperation, OperationType } from "../operations";

interface VisualizerHookArgs {
  grid: Node[][];
}

const INITIAL_SOURCE = { row: 3, column: 13 };
const INITIAL_DESTINATION = { row: 24, column: 48 };

// Custom hook with allows us to visualize effects of pathfinding algorithms
export const useVisualizer = ({ grid }: VisualizerHookArgs) => {
  const [visualizationGrid, setVisualizationGrid] = useState<Node[][]>([]);
  const [pathSource, setPathSource] = useState<{ row: number; column: number }>(
    INITIAL_SOURCE
  );
  const [pathDestination, setPathDestination] = useState<{
    row: number;
    column: number;
  }>(INITIAL_DESTINATION);
  const [isVisualizing, setIsVisualizing] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Initializes visualization grid with usage of grid
  const initVisualizationGrid = useCallback((): void => {
    setVisualizationGrid(grid);
  }, [grid]);

  // Initializes visualization grid with path nodes
  const initPathNodes = useCallback((): void => {
    setVisualizationGrid((prevVisualizationGrid) => {
      if (prevVisualizationGrid.length === 0) return [];

      const updatedVisualizationGrid = [...prevVisualizationGrid];

      updatedVisualizationGrid[pathSource.row][pathSource.column].setNodeType(
        NodeType.PATH_SOURCE
      );
      updatedVisualizationGrid[pathDestination.row][
        pathDestination.column
      ].setNodeType(NodeType.PATH_DESTINATION);

      return updatedVisualizationGrid;
    });
  }, [pathSource, pathDestination]);

  // Set action based on event type
  const setNodeAction = (
    row: number,
    column: number,
    eventType: AbstractEventType
  ): void => {
    setVisualizationGrid((prevVisualizationGrid) => {
      const updatedVisualizationGrid = [...prevVisualizationGrid];

      if (
        updatedVisualizationGrid[row][column].nodeType !== NodeType.PATH_UNUSED
      )
        return updatedVisualizationGrid;

      if (eventType.eventType === EventType.PATH_WALLS)
        updatedVisualizationGrid[row][column].setNodeType(NodeType.PATH_WALL);
      else if (eventType.eventType === EventType.PATH_SOURCE)
        changePathNodes(row, column, NodeType.PATH_SOURCE);
      else if (eventType.eventType === EventType.PATH_DESTINATION)
        changePathNodes(row, column, NodeType.PATH_DESTINATION);

      return updatedVisualizationGrid;
    });
  };

  // Changes path nodes based on previous nodes
  const changePathNodes = (
    row: number,
    column: number,
    nodeType: NodeType
  ): void => {
    setVisualizationGrid((prevVisualizationGrid) => {
      const updatedVisualizationGrid = [...prevVisualizationGrid];

      updatedVisualizationGrid[row][column].setNodeType(nodeType);

      if (nodeType === NodeType.PATH_SOURCE) {
        updatedVisualizationGrid[pathSource.row][pathSource.column].setNodeType(
          NodeType.PATH_UNUSED
        );
        setPathSource({ row: row, column: column });
      } else if (nodeType === NodeType.PATH_DESTINATION) {
        updatedVisualizationGrid[pathDestination.row][
          pathDestination.column
        ].setNodeType(NodeType.PATH_UNUSED);
        setPathDestination({ row: row, column: column });
      }

      return updatedVisualizationGrid;
    });
  };

  // Runs current strategy on grid
  const runPathfinding = (
    strategy: AbstractStrategy,
    operation: AbstractOperation
  ): void => {
    setIsVisualizing(true);
    setIsLoading(true);

    const sourceNode = visualizationGrid[pathSource.row][pathSource.column];
    const destinationNode =
      visualizationGrid[pathDestination.row][pathDestination.column];
    const pathfindingPath = strategy.runPathfinding(
      sourceNode,
      destinationNode
    );

    let visualizationNodes: (number | Node)[];

    if (operation.operationType === OperationType.SHORTEST_PATH) {
      visualizationNodes = [...pathfindingPath[1], ...pathfindingPath[2]];
    } else {
      visualizationNodes = [
        ...pathfindingPath[0],
        ...pathfindingPath[1],
        ...pathfindingPath[2],
      ];
    }

    let currentNodeType = NodeType.PATH_VISITED;

    // if (visualizationNodes.length === 0) setIsLoading(false);

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
  };

  // Runs current generating on grid
  const runGenerating = (generator: AbstractGenerator): void => {
    setIsGenerating(true);
    clearPathfidning();
    const generatedGrid = generator.generate(visualizationGrid);

    generatedGrid.forEach((gridNode, _i) => {
      setTimeout(() => {
        setVisualizationGrid((prevVisualizationGrid) => {
          const updatedVisualizationGrid = [...prevVisualizationGrid];

          if (
            (pathSource.row === gridNode.row &&
              pathSource.column === gridNode.column) ||
            (pathDestination.row === gridNode.row &&
              pathDestination.column === gridNode.column)
          ) {
            if (_i === generatedGrid.length - 1) setIsGenerating(false);
            return updatedVisualizationGrid;
          }

          updatedVisualizationGrid[gridNode.row][gridNode.column].setNodeType(
            NodeType.PATH_WALL
          );

          if (_i === generatedGrid.length - 1) setIsGenerating(false);
          return updatedVisualizationGrid;
        });
      }, 20 * _i);
    });
  };

  // Clears whole grid with intial source and destination nodes
  const clearPathfidning = (clearWalls: boolean = true): void => {
    setVisualizationGrid((prevVisualizationGrid) => {
      const updatedVisualizationGrid = [...prevVisualizationGrid];

      updatedVisualizationGrid.forEach((row) =>
        row.forEach((node) => {
          if (
            !(
              (node.row === pathSource.row &&
                node.column === pathSource.column) ||
              (node.row === pathDestination.row &&
                node.column === pathDestination.column)
            )
          )
            if (!clearWalls && node.nodeType === NodeType.PATH_WALL) return;
            else node.setNodeType(NodeType.PATH_UNUSED);
        })
      );

      setIsVisualizing(false);
      return updatedVisualizationGrid;
    });
  };

  useEffect(() => {
    initVisualizationGrid();
    initPathNodes();
  }, [initVisualizationGrid, initPathNodes]);

  return {
    visualizationGrid,
    isVisualizing,
    isLoading,
    isGenerating,
    setNodeAction,
    runPathfinding,
    runGenerating,
    clearPathfidning,
  };
};
