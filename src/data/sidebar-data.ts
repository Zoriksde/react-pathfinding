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
  EventType,
} from "../strategies";

// Strategies that should be displayed in sidebar
export const sidebarStrategies = [
  { name: "Breadth First Search", strategy: new BFSStrategy() },
  { name: "Depth First Search", strategy: new DFSStrategy() },
  { name: "Dijkstra", strategy: new DijkstraStrategy() },
  { name: "Best First Search", strategy: new BestFirstSearch() },
  { name: "A*", strategy: new AStarStrategy() },
];

// Event types that should be displayed in sidebar
export const sidebarEvents = [
  { name: "Path Source [Start]", type: EventType.PATH_SOURCE },
  { name: "Path Destination [End]", type: EventType.PATH_DESTINATION },
  { name: "Path Walls", type: EventType.PATH_WALLS },
];

// Random maze generators that should be displayed in sidebar
export const sidebarMazeGenerators = [
  { name: "Basic Random Maze", generator: new BasicRandomMazeGenerator() },
  { name: "Recursion Division", generator: new RecursionDivisionGenerator() },
  { name: "Random Walls", generator: new RandomWallsGenerator() },
];
