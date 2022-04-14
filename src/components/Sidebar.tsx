import "./Sidebar.css";
import {
  sidebarStrategies,
  sidebarEvents,
  sidebarMazeGenerators,
} from "../data/sidebar-data";
import { AbstractStrategy, EventType } from "../strategies";
import { AbstractGenerator } from "../generators";

interface SidebarProps {
  onStrategyClick: (strategy: AbstractStrategy) => void;
  onEventTypeClick: (eventType: EventType) => void;
  onGeneratorTypeClick: (generatorType: AbstractGenerator) => void;
  strategy: AbstractStrategy;
  eventType: EventType;
  generator: AbstractGenerator;
}

const Sidebar = ({
  onStrategyClick,
  onEventTypeClick,
  onGeneratorTypeClick,
  strategy,
  eventType,
  generator,
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

      {sidebarMazeGenerators.map((data) => (
        <div
          key={data.name}
          className={`sidebar-item ${
            data.name === generator.name && "generator-active"
          }`}
          onClick={onGeneratorTypeClick.bind(null, data.generator)}
        >
          {data.name}
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
