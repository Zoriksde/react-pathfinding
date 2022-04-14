import { EventType } from "../strategies";
import { usePathfinding } from "../hooks/usePathfinding";
import { useVisualizer } from "../hooks/useVisualizer";
import { AbstractStrategy } from "../strategies";
import GridNode from "./GridNode";
import "./Visualizer.css";
import { AbstractGenerator } from "../generators";

export const ROWS = 26;
export const COLUMNS = 50;

interface VisualizerProps {
  strategy: AbstractStrategy;
  eventType: EventType;
  generator: AbstractGenerator;
}

const Visualizer = ({ strategy, eventType, generator }: VisualizerProps) => {
  const [grid] = usePathfinding({ rows: ROWS, columns: COLUMNS });
  const { visualizationGrid, setNodeAction } = useVisualizer({ grid: grid });

  const onNodeClickHandler = (row: number, column: number): void => {
    setNodeAction(row, column, eventType);
  };

  return (
    <div className="visualizer">
      <div className="visualizer-menu">
        <div className="visualizer-item" style={{ backgroundColor: "#e050bc" }}>
          <span>Visualize {strategy.name}</span>
        </div>
        <div className="visualizer-item" style={{ backgroundColor: "#b04a4a" }}>
          <span>Generate {generator.name}</span>
        </div>
        <div className="visualizer-item" style={{ backgroundColor: "#3a8755" }}>
          <span>Clear</span>
        </div>
      </div>
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
    </div>
  );
};

export default Visualizer;
