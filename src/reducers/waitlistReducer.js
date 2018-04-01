// @flow

import type {Action} from '../actions';

import { combineReducers } from 'redux';

function active(state: boolean = true, action: Action): boolean {
  switch (action.type) {
    case 'GET_WAITLIST_STATUS':
      if ('offWaitlist' in action.payload) {
        return !action.payload.offWaitlist;
      } else {
        return state;
      }
    default:
      return state;
  }
}

function place(state: number = 10, action: Action): number {
  switch (action.type) {
    case 'GET_WAITLIST_STATUS':
      if ('place' in action.payload) {
        return action.payload.place;
      } else {
        return state;
      }
    default:
      return state;
  }
}

export const waitlistReducer = combineReducers({
  active,
  place
});
export default waitlistReducer;
