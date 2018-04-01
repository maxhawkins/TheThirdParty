// @flow

import type {Action} from '../actions';
import type {Event, EventID} from '../API';

import { combineReducers } from 'redux';

function data(state: {[EventID]: Event} = { }, action: Action): {[EventID]: Event} {
  switch (action.type) {
    case 'GENERATE_DEST_SUCCESS':
      var newState = { ...state };
      action.payload.events
        .forEach(event => newState[String(event.id)] = event);
      return newState;

    case 'LIST_DESTS_SUCCESS':
      var newData = { };
      for (var i = 0; i < action.payload.length; i++) {
        var dest = action.payload[i];
        var event = dest.event;
        if (!event) {
          continue;
        }

        newData[String(event.id)] = event;
      }
      return { ...state, ...newData };
  }
  return state;
}

function selectedID(state: ?EventID = null, action: Action): ?EventID {
  switch (action.type) {
    case 'SELECT_EVENT':
      return action.payload;
    case 'OPEN_MAP':
      return action.payload
    case 'CLOSE_MAP':
    case 'CLOSE_EVENT':
      return null;
    default:
      return state;
  }
}

export const events = combineReducers({
  data,
  selectedID
});
export default events;
