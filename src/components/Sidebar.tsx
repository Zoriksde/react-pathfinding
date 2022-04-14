import "./Sidebar.css";
import { sidebarStrategies, sidebarEvents } from "../data/sidebar-data";
import { AbstractStrategy, EventType } from "../strategies";

interface SidebarProps {
  onStrategyClick: (strategy: AbstractStrategy) => void;
  onEventTypeClick: (eventType: EventType) => void;
  strategy: AbstractStrategy;
  eventType: EventType;
}

const Sidebar = ({
  onStrategyClick,
  onEventTypeClick,
  strategy,
  eventType,
}: SidebarProps) => {
  return (
    <aside className="sidebar">
      {sidebarStrategies.map((data) => (
        <div
          className={`sidebar-item ${
            data.name === strategy.name && "strategy-active"
          }`}
          key={data.name}
          onClick={onStrategyClick.bind(null, data.strategy)}
        >
          {data.name}
        </div>
      ))}

      {sidebarEvents.map((data) => (
        <div
          key={data.name}
          className={`sidebar-item ${
            data.type === eventType && "event-active"
          }`}
          onClick={onEventTypeClick.bind(null, data.type)}
        >
          {data.name}
        </div>
      ))}

      <div
        className="sidebar-button"
        style={{ backgroundColor: "rgb(7, 88, 166)" }}
      >
        <span>Visualize</span>
      </div>
      <div
        className="sidebar-button"
        style={{ backgroundColor: "rgb(166, 7, 88)" }}
      >
        <span>Clear</span>
      </div>
    </aside>
  );
};

export default Sidebar;
