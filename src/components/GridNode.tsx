import { NodeType } from "../strategies";
import "./GridNode.css";
import { COLUMNS, ROWS } from "./Visualizer";

interface GridNodeProps {
  row: number;
  column: number;
  nodeType: NodeType;
  onClick: (row: number, column: number) => void;
}

const GridNode = ({ row, column, nodeType, onClick }: GridNodeProps) => {
  return (
    <div
      className={`grid-node ${nodeType === NodeType.PATH_WALL && "wall-node"}
      ${nodeType === NodeType.PATH_SOURCE && "source-node"}
      ${nodeType === NodeType.PATH_DESTINATION && "destination-node"}
      ${nodeType === NodeType.PATH_VISUALIZED && "visualized-node"}
      ${nodeType === NodeType.PATH_VISITED && "visited-node"}`}
      onClick={onClick.bind(null, row, column)}
      style={{
        borderBottom: row === ROWS - 1 ? "1px solid #15171c6a" : "none",
        borderRight: column === COLUMNS - 1 ? "1px solid #15171c6a" : "none",
      }}
    />
  );
};

export default GridNode;
