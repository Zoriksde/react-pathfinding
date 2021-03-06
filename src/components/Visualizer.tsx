import { usePathfinding } from "../hooks/usePathfinding";
import { useVisualizer } from "../hooks/useVisualizer";
import { AbstractStrategy } from "../strategies";
import GridNode from "./GridNode";
import "./Visualizer.css";
import { AbstractGenerator } from "../generators";
import { AbstractEventType } from "../events";
import { AbstractOperation } from "../operations";

export const ROWS = 27;
export const COLUMNS = 51;

interface VisualizerProps {
  strategy: AbstractStrategy;
  eventType: AbstractEventType;
  generator: AbstractGenerator;
  operation: AbstractOperation;
}

const Visualizer = ({
  strategy,
  eventType,
  generator,
  operation,
}: VisualizerProps) => {
  const [grid] = usePathfinding({ rows: ROWS, columns: COLUMNS });
  const {
    visualizationGrid,
    isVisualizing,
    isGenerating,
    isLoading,
    setNodeAction,
    runPathfinding,
    runGenerating,
    clearPathfidning,
  } = useVisualizer({
    grid: grid,
  });

  const onNodeClickHandler = (row: number, column: number): void => {
    if (isVisualizing || isGenerating) return;
    setNodeAction(row, column, eventType);
  };

  const onVisualizerClickHandler = (): void => {
    if (isVisualizing || isGenerating) return;
    runPathfinding(strategy, operation);
  };

  const onGeneratorClickHandler = (): void => {
    if (isVisualizing || isGenerating) return;
    runGenerating(generator);
  };

  const onClearClickHandler = (clearWalls: boolean): void => {
    if (isLoading || isGenerating) return;
    clearPathfidning(clearWalls);
  };

  return (
    <div className="visualizer">
      <div className="visualizer-menu">
        <div
          className="visualizer-item"
          style={{
            backgroundColor:
              isVisualizing || isGenerating ? "#c96567" : "#314455",
          }}
          onClick={onVisualizerClickHandler}
        >
          <span>Visualize {strategy.name}</span>
        </div>
        <div
          className="visualizer-item"
          style={{
            backgroundColor:
              isVisualizing || isGenerating ? "#c96567" : "#644e5b",
          }}
          onClick={onGeneratorClickHandler}
        >
          <span>Generate {generator.name}</span>
        </div>
        <div
          className="visualizer-item"
          style={{
            backgroundColor: isLoading || isGenerating ? "#c96567" : "#97aabd",
          }}
          onClick={onClearClickHandler.bind(null, true)}
        >
          <span>Clear Board</span>
        </div>
        <div
          className="visualizer-item"
          style={{
            backgroundColor: isLoading || isGenerating ? "#c96567" : "#97aabd",
          }}
          onClick={onClearClickHandler.bind(null, false)}
        >
          <span>Clear Visualization</span>
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
