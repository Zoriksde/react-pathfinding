import { AbstractEventType, EventType } from "./AbstractEventType";

export class PathSourceEventType extends AbstractEventType {
  constructor() {
    super("Path Source", EventType.PATH_SOURCE);
  }
}
