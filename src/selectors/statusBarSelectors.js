// @flow

import type {State} from "../types";
import type {StatusBarStyle} from 'react-native/Libraries/Components/StatusBar/StatusBar.js';

import { getCurrentPage } from './pageSelectors';

export function getStatusBarStyle(state: State): StatusBarStyle {
  switch (getCurrentPage(state)) {
    case 'home':
      if (state.homePageSection === 'history') {
        return 'dark-content';
      } else {
        return 'light-content';
      }
    case 'auth':
      return 'light-content';
    default:
      return 'dark-content';
  }
}
