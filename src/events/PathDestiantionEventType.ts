import { AbstractEventType, EventType } from "./AbstractEventType";

export class PathDestinationEventType extends AbstractEventType {
  constructor() {
    super("Path Destination", EventType.PATH_DESTINATION);
  }
}
