import { useCallback, useEffect, useState } from "react";
import { AbstractStrategy, EventType, NodeType } from "../strategies";
import { Node } from "../strategies/Node";

interface VisualizerHookArgs {
  grid: Node[][];
}

// Custom hook with allows us to visualize effects of pathfinding algorithms
export const useVisualizer = ({ grid }: VisualizerHookArgs) => {
  const [visualizationGrid, setVisualizationGrid] = useState<Node[][]>([]);
  const [pathSource, setPathSource] = useState<{ row: number; column: number }>(
    { row: 12, column: 33 }
  );
  const [pathDestination, setPathDestination] = useState<{
    row: number;
    column: number;
  }>({ row: 19, column: 3 });

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
    // strategy.runPathfinding();
  };

  useEffect(() => {
    initVisualizationGrid();
    initPathNodes();
  }, [initVisualizationGrid, initPathNodes]);

  return { visualizationGrid, setNodeAction };
};
