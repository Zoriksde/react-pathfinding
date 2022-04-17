import { AbstractEventType, EventType } from "./AbstractEventType";

export class PathWallsEventType extends AbstractEventType {
  constructor() {
    super("Path Walls", EventType.PATH_WALLS);
  }
}
