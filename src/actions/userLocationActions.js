// @flow

import type {Location} from '../Geolocation';

export type Action = UpdateLocationAction;

type UpdateLocationAction = {|
  +type: 'UPDATE_USER_LOCATION',
  +payload: Location
|};
export function updateUserLocation(coord: Location): UpdateLocationAction {
  return { type: 'UPDATE_USER_LOCATION', payload: coord };
}
