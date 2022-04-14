import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Visualizer from "./components/Visualizer";
import { BFSStrategy, AbstractStrategy, EventType } from "./strategies";

const App = () => {
  const [currentStrategy, setCurrentStrategy] = useState<AbstractStrategy>(
    new BFSStrategy()
  );
  const [currentEventType, setCurrentEventType] = useState<EventType>(
    EventType.PATH_SOURCE
  );

  const onStrategyClickHandler = (strategy: AbstractStrategy): void => {
    setCurrentStrategy(strategy);
  };

  const onEventTypeClickHandler = (eventType: EventType): void => {
    setCurrentEventType(eventType);
  };

  return (
    <div className="app">
      <Sidebar
        onStrategyClick={onStrategyClickHandler}
        onEventTypeClick={onEventTypeClickHandler}
        strategy={currentStrategy}
        eventType={currentEventType}
      />
      <Visualizer strategy={currentStrategy} eventType={currentEventType} />
    </div>
  );
};

export default App;
