// @flow

import type {Action} from '../actions';

import { combineReducers } from 'redux';

function height(state: number = 0, action: Action): number {
  switch (action.type) {
    case 'CHANGE_KEYBOARD':
      const {height} = action.payload;
      return height;
    default:
      return state;
  }
}

export const keyboardReducer = combineReducers({
  height
});
export default keyboardReducer;
