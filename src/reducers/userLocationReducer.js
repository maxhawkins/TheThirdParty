// @flow

import type {Action} from "../actions";
import type {Location} from '../Geolocation';

export function userLocation(state: ?Location = null, action: Action): ?Location {
  switch (action.type) {
    case 'UPDATE_USER_LOCATION':
      return action.payload;
    default:
      return state;
  }
}

export default userLocation;
