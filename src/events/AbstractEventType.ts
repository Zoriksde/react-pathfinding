export enum EventType {
  PATH_SOURCE,
  PATH_DESTINATION,
  PATH_WALLS,
}

export class AbstractEventType {
  constructor(public name: string, public eventType: EventType) {}
}
