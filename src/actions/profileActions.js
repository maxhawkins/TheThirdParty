// @flow

export type Action = OpenProfile
| CloseProfile;

type OpenProfile = {|
  +type: 'OPEN_PROFILE'
|};
export function openProfile(): OpenProfile {
  return { type: 'OPEN_PROFILE' };
}

type CloseProfile = {|
  +type: 'CLOSE_PROFILE'
|};
export function closeProfile(): CloseProfile {
  return { type: 'CLOSE_PROFILE' };
}
