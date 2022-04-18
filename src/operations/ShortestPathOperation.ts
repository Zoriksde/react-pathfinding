import { AbstractOperation, OperationType } from "./AbstractOperation";

export class ShortestPathOperation extends AbstractOperation {
  constructor() {
    super("Shortest Path", OperationType.SHORTEST_PATH);
  }
}
