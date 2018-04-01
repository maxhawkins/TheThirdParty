// @flow

import type {Dest, DestID, Event} from '../API';
import type {State} from '../types';

import { getEvent } from './eventSelectors';
import { getCurrentPage } from './pageSelectors';

export function getDests(state: State): Array<Dest> {
  const results = [];

  state.dests.sequence.forEach((destID) => {
    const dest = getDest(state, destID);
    if (dest) {
      results.push(dest);
    }
  });

  return results;
}

export function getDest(state: State, destID: DestID): ?Dest {
  let dest: ?Dest = state.dests.data[destID];
  if (!dest) {
    return null;
  }

  const event = getEvent(state, dest.eventID);
  if (event) {
    dest.event = event;
  }

  return dest;
}

export function getCurrentDest(state: State): Dest {
  const {dests} = state;

  const destID = dests.sequence[0];
  return dests.data[destID];
}

export function getCurrentEvent(state: State): ?Event {
  const dest = getCurrentDest(state);
  if (!dest) {
    return null;
  }
  return state.events.data[dest.eventID];
}
