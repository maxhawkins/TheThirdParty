// @flow

import type {HomePageSection} from '../types';

export type Action = ChangeHomePageSection;

type ChangeHomePageSection = {|
  type: 'CHANGE_HOME_PAGE_SECTION',
  payload: HomePageSection
|};
export function changeHomePageSection(section: HomePageSection): ChangeHomePageSection {
  return { type: 'CHANGE_HOME_PAGE_SECTION', payload: section };
}
