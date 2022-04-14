import { EventType } from "../strategies";
import { usePathfinding } from "../hooks/usePathfinding";
import { useVisualizer } from "../hooks/useVisualizer";
import { AbstractStrategy } from "../strategies";
import GridNode from "./GridNode";
import "./Visualizer.css";

export const ROWS = 29;
export const COLUMNS = 45;

interface VisualizerProps {
  strategy: AbstractStrategy;
  eventType: EventType;
}

const Visualizer = ({ strategy, eventType }: VisualizerProps) => {
  const [grid] = usePathfinding({ rows: ROWS, columns: COLUMNS });
  const { visualizationGrid, setNodeAction } = useVisualizer({ grid: grid });

  const onNodeClickHandler = (row: number, column: number): void => {
    setNodeAction(row, column, eventType);
  };

  return (
    <div className="visualizer-grid">
      {visualizationGrid.map((row, _row) => (
        <div className="visualizer-row" key={_row}>
          {row.map((node, _node) => (
            <GridNode
              key={_node}
              row={node.row}
              column={node.column}
              nodeType={node.nodeType}
              onClick={onNodeClickHandler}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Visualizer;
