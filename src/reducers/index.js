// @flow

import type {Action} from '../actions';

import { combineReducers } from 'redux';

import actionSheet from './actionSheetReducer';
import auth from './authReducer';
import dests from './destsReducer';
import events from './eventsReducer';
import homePageSection from './homePageSectionReducer';
import keyboard from './keyboardReducer';
import pageStack from './pageStackReducer';
import userLocation from './userLocationReducer';
import waitlist from './waitlistReducer';

const rootReducer = combineReducers({
  actionSheet,
  auth,
  dests,
  events,
  homePageSection,
  keyboard,
  pageStack,
  userLocation,
  waitlist
});

type Fn<T> = () => T;
type ExtractReturnHelper<U, F: Fn<U> > = U;
type ExtractReturn<F> = ExtractReturnHelper<*, F> ;
export type State = ExtractReturn<typeof rootReducer> ;

export type Reducer = (state: State, action: Action) => State

const reducer: Reducer = rootReducer;
export default reducer;
