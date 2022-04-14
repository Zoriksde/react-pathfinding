import {
  BFSStrategy,
  DFSStrategy,
  DijkstraStrategy,
  BellmanFordStrategy,
  AStarStrategy,
  EventType,
} from "../strategies";

// Strategies that should be displayed in sidebar
export const sidebarStrategies = [
  { name: "Breadth First Search", strategy: new BFSStrategy() },
  { name: "Depth First Search", strategy: new DFSStrategy() },
  { name: "Dijkstra", strategy: new DijkstraStrategy() },
  { name: "Bellman Ford", strategy: new BellmanFordStrategy() },
  { name: "A*", strategy: new AStarStrategy() },
];

// Event types that should be displayed in sidebar
export const sidebarEvents = [
  { name: "Path Source [Start]", type: EventType.PATH_SOURCE },
  { name: "Path Destination [End]", type: EventType.PATH_DESTINATION },
  { name: "Path Walls", type: EventType.PATH_WALLS },
];
