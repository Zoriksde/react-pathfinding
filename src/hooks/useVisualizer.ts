import { useCallback, useEffect, useState } from "react";
import { AbstractGenerator } from "../generators";
import { AbstractStrategy, EventType, NodeType } from "../strategies";
import { Node } from "../strategies/Node";

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
    eventType: EventType
  ): void => {
    setVisualizationGrid((prevVisualizationGrid) => {
      const updatedVisualizationGrid = [...prevVisualizationGrid];

      if (
        updatedVisualizationGrid[row][column].nodeType !== NodeType.PATH_UNUSED
      )
        return updatedVisualizationGrid;

      if (eventType === EventType.PATH_WALLS)
        updatedVisualizationGrid[row][column].setNodeType(NodeType.PATH_WALL);
      else if (eventType === EventType.PATH_SOURCE)
        changePathNodes(row, column, NodeType.PATH_SOURCE);
      else if (eventType === EventType.PATH_DESTINATION)
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
  const runPathfinding = (strategy: AbstractStrategy): void => {
    setIsVisualizing(true);
    const sourceNode = visualizationGrid[pathSource.row][pathSource.column];
    const destinationNode =
      visualizationGrid[pathDestination.row][pathDestination.column];
    const pathfindingPath = strategy.runPathfinding(
      sourceNode,
      destinationNode
    );

    setVisualizationGrid((prevVisualizationGrid) => {
      const updatedVisualizationGrid = [...prevVisualizationGrid];

      pathfindingPath.forEach((pathNode) => {
        updatedVisualizationGrid[pathNode.row][pathNode.column].setNodeType(
          NodeType.PATH_VISUALIZED
        );
      });

      return updatedVisualizationGrid;
    });
  };

  // Runs current generating on grid
  const runGenerating = (generator: AbstractGenerator): void => {
    const generatedGrid = generator.generate(visualizationGrid);

    setVisualizationGrid((prevVisualizationGrid) => {
      const updatedVisualizationGrid = [...prevVisualizationGrid];

      generatedGrid.forEach((gridNode) => {
        if (
          (pathSource.row === gridNode.row &&
            pathSource.column === gridNode.column) ||
          (pathDestination.row === gridNode.row &&
            pathDestination.column === gridNode.column)
        )
          return;

        updatedVisualizationGrid[gridNode.row][gridNode.column].setNodeType(
          NodeType.PATH_WALL
        );
      });

      return updatedVisualizationGrid;
    });
  };

  // Clears whole grid with intial source and destination nodes
  const clearPathfidning = (): void => {
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
            node.setNodeType(NodeType.PATH_UNUSED);
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
    setNodeAction,
    runPathfinding,
    runGenerating,
    clearPathfidning,
  };
};