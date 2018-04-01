// @flow

import type {State} from "../types";
import type {Page} from '../types';

export function getCurrentPage(state: State): Page {
  return state.pageStack[0];
}
