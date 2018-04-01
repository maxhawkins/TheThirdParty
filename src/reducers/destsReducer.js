// @flow

import type {Action} from '../actions';
import type {Dest, DestID, DestGenerateResult} from '../API';

import { combineReducers } from 'redux';

function sequence(state: Array<DestID> = [], action: Action): DestID[] {
  switch (action.type) {
    case 'SIGN_OUT_COMPLETE':
      return [];

    case 'GENERATE_DEST_SUCCESS':
      var dests = action.payload.dests;
      dests.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

      var newIDs = [];
      dests.forEach(dest => {
        const id = dest.id;
        if (state.find(i => i === id)) {
          return;
        }

        newIDs.push(id);
      });

      return [...newIDs, ...state];

    case 'LIST_DESTS_SUCCESS':
      var dests = [...action.payload];
      if (dests.length == 0) {
        return [];
      }

      dests.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
      return dests.map(d => d.id);
  }

  return state;
}

function data(state: {[DestID]: Dest} = { }, action: Action): {[DestID]: Dest} {
  switch (action.type) {
    case 'ACCEPT_DEST_REQUEST':
      var destID = action.meta.destID;
      var dest = state[destID];
      var updated = { ...dest, status: 'going' };

      return { ...state, [String(destID)]: updated };

    case 'ACCEPT_DEST_ERROR':
      var destID = action.meta.destID;
      var dest = state[destID];
      var updated = { ...dest, status: '' };

      return { ...state, [String(destID)]: updated };

    case 'GENERATE_DEST_SUCCESS':
      var newState = { ...state };
      action.payload.dests
        .forEach(dest => newState[String(dest.id)] = dest);
      return newState;

    case 'LIST_DESTS_SUCCESS':
      var newData = { };
      for (var i = 0; i < action.payload.length; i++) {
        var item = action.payload[i];
        newData[String(item.id)] = item;
      }
      return { ...state, ...newData };
  }

  return state;
}

export function isLoading(state: boolean = false, action: Action): boolean {
  switch (action.type) {
    case 'LIST_DESTS_ERROR':
    case 'LIST_DESTS_SUCCESS':
    case 'GENERATE_DEST_SUCCESS':
    case 'GENERATE_DEST_ERROR':
      return false;
    case 'LIST_DESTS_REQUEST':
    case 'GENERATE_DEST_REQUEST':
      return true;
    default:
      return state;
  }
}

export function error(state: ?Error = null, action: Action): ?Error {
  switch (action.type) {
    case 'LIST_DESTS_REQUEST':
      return null;
    case 'LIST_DESTS_ERROR':
      return action.payload;
    case 'LIST_DESTS_SUCCESS':
      return null;
    default:
      return state;
  }
}

export function generateResult(state: DestGenerateResult = 'ok', action: Action): DestGenerateResult {
  switch (action.type) {
    case 'GENERATE_DEST_REQUEST':
      return 'ok';
    case 'GENERATE_DEST_ERROR':
      return 'error';
    case 'GENERATE_DEST_SUCCESS':
      return action.payload.result;
    default:
      return state
  }
}

export const dests = combineReducers({
  data,
  error,
  generateResult,
  isLoading,
  sequence
});
export default dests;
