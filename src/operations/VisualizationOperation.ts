import { AbstractOperation, OperationType } from "./AbstractOperation";

export class VisualizationOperation extends AbstractOperation {
  constructor() {
    super("Visualization", OperationType.VISUALIZATION);
  }
}
