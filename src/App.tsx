import { useState } from "react";
import Header from "./components/Header";
import Visualizer from "./components/Visualizer";
import { AbstractGenerator, BasicRandomMazeGenerator } from "./generators";
import { BFSStrategy, AbstractStrategy } from "./strategies";
import { AbstractEventType, PathSourceEventType } from "./events";

const App = () => {
  const [currentStrategy, setCurrentStrategy] = useState<AbstractStrategy>(
    new BFSStrategy()
  );
  const [currentEventType, setCurrentEventType] = useState<AbstractEventType>(
    new PathSourceEventType()
  );

  const [currentGenerator, setCurrentGenerator] = useState<AbstractGenerator>(
    new BasicRandomMazeGenerator()
  );

  const onStrategyClickHandler = (strategy: AbstractStrategy): void => {
    setCurrentStrategy(strategy);
  };

  const onEventTypeClickHandler = (eventType: AbstractEventType): void => {
    setCurrentEventType(eventType);
  };

  const onGeneratorClickHandler = (generator: AbstractGenerator): void => {
    setCurrentGenerator(generator);
  };

  return (
    <div className="app">
      <Header
        onStrategyClick={onStrategyClickHandler}
        onEventTypeClick={onEventTypeClickHandler}
        onGeneratorClick={onGeneratorClickHandler}
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
