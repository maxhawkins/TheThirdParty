// @flow

import type {Event, EventID} from '../API';
import type {State} from '../types';

export function getSelectedEvent(state: State): ?Event {
  const {events} = state;
  return events.selectedID ? getEvent(state, events.selectedID) : null;
}

export function getEvent(state: State, eventID: EventID): ?Event {
  return state.events.data[eventID];
}
