import "./Header.css";
import {
  headerStrategies,
  headerEvents,
  headerMazeGenerators,
  headerOperations,
} from "../data/header-data";
import { AbstractStrategy } from "../strategies";
import { AbstractGenerator } from "../generators";
import Dropdown from "./Dropdown";
import { AbstractEventType } from "../events";
import { AbstractOperation } from "../operations";

interface HeaderProps {
  onStrategyClick: (strategy: AbstractStrategy) => void;
  onEventTypeClick: (eventType: AbstractEventType) => void;
  onGeneratorClick: (generator: AbstractGenerator) => void;
  onOperationClick: (operation: AbstractOperation) => void;
  strategy: AbstractStrategy;
  eventType: AbstractEventType;
  generator: AbstractGenerator;
  operation: AbstractOperation;
}

const Header = ({
  onStrategyClick,
  onEventTypeClick,
  onGeneratorClick,
  onOperationClick,
  strategy,
  eventType,
  generator,
  operation,
}: HeaderProps) => {
  return (
    <header className="header">
      <Dropdown
        dropdownActive={strategy}
        dropdownItems={headerStrategies}
        onItemClick={onStrategyClick}
        activeColor="#314455"
      />

      <Dropdown
        dropdownActive={generator}
        dropdownItems={headerMazeGenerators}
        onItemClick={onGeneratorClick}
        activeColor="#644e5b"
      />

      <Dropdown
        dropdownActive={eventType}
        dropdownItems={headerEvents}
        onItemClick={onEventTypeClick}
        activeColor="#97aabd"
      />

      <Dropdown
        dropdownActive={operation}
        dropdownItems={headerOperations}
        onItemClick={onOperationClick}
        activeColor="#152d32"
      />
    </header>
  );
};

export default Header;
