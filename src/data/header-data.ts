import {
  PathDestinationEventType,
  PathSourceEventType,
  PathWallsEventType,
} from "../events";
import {
  BasicRandomMazeGenerator,
  RandomWallsGenerator,
  RecursionDivisionGenerator,
} from "../generators";
import {
  BFSStrategy,
  DFSStrategy,
  DijkstraStrategy,
  BestFirstSearch,
  AStarStrategy,
} from "../strategies";

// Strategies that should be displayed in header
export const headerStrategies = [
  new BFSStrategy(),
  new DFSStrategy(),
  new DijkstraStrategy(),
  new BestFirstSearch(),
  new AStarStrategy(),
];

// Event types that should be displayed in header
export const headerEvents = [
  new PathSourceEventType(),
  new PathDestinationEventType(),
  new PathWallsEventType(),
];

// Random maze generators that should be displayed in header
export const headerMazeGenerators = [
  new BasicRandomMazeGenerator(),
  new RecursionDivisionGenerator(),
  new RandomWallsGenerator(),
];
