// @flow

export type Action = OpenStories

type OpenStories = {|
  +type: 'OPEN_STORIES'
|};
export function openStories(): OpenStories {
  return { type: 'OPEN_STORIES' };
}
