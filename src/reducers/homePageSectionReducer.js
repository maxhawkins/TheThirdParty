// @flow

import type {Action} from '../actions';
import type {HomePageSection} from '../types';

export function homePageSection(state: HomePageSection = 'next-event', action: Action): HomePageSection {
  switch (action.type) {
    case 'CHANGE_HOME_PAGE_SECTION':
      return action.payload;
    default:
      return state;
  }
}

export default homePageSection;
