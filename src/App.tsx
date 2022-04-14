import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Visualizer from "./components/Visualizer";
import { AbstractGenerator, BasicRandomMazeGenerator } from "./generators";
import { BFSStrategy, AbstractStrategy, EventType } from "./strategies";

const App = () => {
  const [currentStrategy, setCurrentStrategy] = useState<AbstractStrategy>(
    new BFSStrategy()
  );
  const [currentEventType, setCurrentEventType] = useState<EventType>(
    EventType.PATH_SOURCE
  );

  const [currentGenerator, setCurrentGenerator] = useState<AbstractGenerator>(
    new BasicRandomMazeGenerator()
  );

  const onStrategyClickHandler = (strategy: AbstractStrategy): void => {
    setCurrentStrategy(strategy);
  };

  const onEventTypeClickHandler = (eventType: EventType): void => {
    setCurrentEventType(eventType);
  };

  const onGeneratorTypeClickHandler = (generator: AbstractGenerator): void => {
    setCurrentGenerator(generator);
  };

  return (
    <div className="app">
      <Sidebar
        onStrategyClick={onStrategyClickHandler}
        onEventTypeClick={onEventTypeClickHandler}
        onGeneratorTypeClick={onGeneratorTypeClickHandler}
        strategy={currentStrategy}
        eventType={currentEventType}
        generator={currentGenerator}
      />
      <Visualizer
        strategy={currentStrategy}
        eventType={currentEventType}
        generator={currentGenerator}
      />
    </div>
  );
};

export default App;
