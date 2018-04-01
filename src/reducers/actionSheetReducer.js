// @flow

import type {Action} from '../actions';

import { combineReducers } from 'redux';

function visible(state: boolean = false, action: Action): boolean {
  switch (action.type) {
    case 'SHOW_DIRECTIONS_START':
      return true
    case 'SHOW_DIRECTIONS_COMPLETE':
      return false;
    default:
      return state;
  }
}

const reducers = {
  visible
};

export const actionSheet = combineReducers(reducers);
export default actionSheet;
