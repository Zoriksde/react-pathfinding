import {
  PathDestinationEventType,
  PathSourceEventType,
  PathWallsEventType,
} from "../events";
import {
  BasicRandomMazeGenerator,
  RandomWallsGenerator,
  RecursionDivisionGenerator,
  RandomizedDFSGenerator,
} from "../generators";
import { ShortestPathOperation, VisualizationOperation } from "../operations";
import {
  BFSStrategy,
  DFSStrategy,
  DijkstraStrategy,
  BestFirstSearch,
  AStarStrategy,
  RandomizedDFSStrategy,
} from "../strategies";

// Strategies that should be displayed in header
export const headerStrategies = [
  new BFSStrategy(),
  new DFSStrategy(),
  new DijkstraStrategy(),
  new BestFirstSearch(),
  new AStarStrategy(),
  new RandomizedDFSStrategy(),
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
  new RandomizedDFSGenerator(),
];

// Types of operation that should be displayed in header
export const headerOperations = [
  new VisualizationOperation(),
  new ShortestPathOperation(),
];
