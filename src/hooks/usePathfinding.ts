import { useCallback, useEffect, useState } from "react";
import { Node } from "../strategies/Node";

interface PathfindingHookArgs {
  rows: number;
  columns: number;
}

// Custom hook which creates initial pathfinding adjacency list of nodes
export const usePathfinding = ({ rows, columns }: PathfindingHookArgs) => {
  const [grid, setGrid] = useState<Node[][]>([]);

  // Initializes adjacency list of nodes
  const initGrid = useCallback((): void => {
    const newGrid: Node[][] = [];
    for (let row = 0; row < rows; row++) newGrid.push([]);
    setGrid(newGrid);
  }, [rows]);

  // Creates nodes in adjacency list of nodes
  const createNodes = useCallback((): void => {
    setGrid((prevGrid) => {
      const updatedGrid = [...prevGrid];
      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          updatedGrid[row].push(new Node(row, column));
        }
      }

      return updatedGrid;
    });
  }, [rows, columns]);

  // Finds neighbours of each node
  const findNeighbours = useCallback(
    (currentGrid: Node[][], row: number, column: number): Node[] => {
      const neighbours: Node[] = [];

      if (row > 0) neighbours.push(currentGrid[row - 1][column]);
      if (row < rows - 1) neighbours.push(currentGrid[row + 1][column]);
      if (column > 0) neighbours.push(currentGrid[row][column - 1]);
      if (column < columns - 1) neighbours.push(currentGrid[row][column + 1]);

      return neighbours;
    },
    [rows, columns]
  );

  // Creates neighbours of each node in adjacency list of nodes
  const createNeighbours = useCallback((): void => {
    setGrid((prevGrid) => {
      const updatedGrid = [...prevGrid];

      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          const neighbours = findNeighbours(updatedGrid, row, column);
          neighbours.forEach((neighbour) =>
            updatedGrid[row][column].addNeighbour(neighbour)
          );
        }
      }

      return updatedGrid;
    });
  }, [rows, columns, findNeighbours]);

  useEffect(() => {
    initGrid();
    createNodes();
    createNeighbours();
  }, [initGrid, createNodes, createNeighbours]);

  return [grid];
};
