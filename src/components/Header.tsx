import "./Header.css";
import {
  headerStrategies,
  headerEvents,
  headerMazeGenerators,
} from "../data/header-data";
import { AbstractStrategy } from "../strategies";
import { AbstractGenerator } from "../generators";
import Dropdown from "./Dropdown";
import { AbstractEventType } from "../events";

interface HeaderProps {
  onStrategyClick: (strategy: AbstractStrategy) => void;
  onEventTypeClick: (eventType: AbstractEventType) => void;
  onGeneratorClick: (generator: AbstractGenerator) => void;
  strategy: AbstractStrategy;
  eventType: AbstractEventType;
  generator: AbstractGenerator;
}

const Header = ({
  onStrategyClick,
  onEventTypeClick,
  onGeneratorClick,
  strategy,
  eventType,
  generator,
}: HeaderProps) => {
  return (
    <header className="header">
      <Dropdown
        dropdownActive={strategy}
        dropdownItems={headerStrategies}
        onItemClick={onStrategyClick}
        activeColor="#5cc9cb"
      />

      <Dropdown
        dropdownActive={eventType}
        dropdownItems={headerEvents}
        onItemClick={onEventTypeClick}
        activeColor="#0f8b6a"
      />

      <Dropdown
        dropdownActive={generator}
        dropdownItems={headerMazeGenerators}
        onItemClick={onGeneratorClick}
        activeColor="#3e5d72"
      />
    </header>
  );
};

export default Header;