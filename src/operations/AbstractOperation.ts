export enum OperationType {
  VISUALIZATION,
  SHORTEST_PATH,
}

export class AbstractOperation {
  constructor(public name: string, public operationType: OperationType) {}
}
