// @flow

import type {Deps, Reducer, State} from './types';

import {
    changeKeyboard,
    signOutComplete,
    updateUserLocation
} from './actions';
import rootReducer from './reducers';
import errorLoggerMiddleware from './middleware/errorLoggerMiddleware';
import { getStatusBarStyle, getCurrentPage } from './selectors';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

export default function makeStore(deps: Deps, reducer: Reducer = rootReducer) {
  const {
    analytics,
    api,
    auth,
    errorLogger,
    geo,
    keyboard,
    statusBar
  } = deps;

  let store = createStore(rootReducer,
    applyMiddleware(
      thunkMiddleware.withExtraArgument(deps),
      errorLoggerMiddleware(
        errorLogger,
        (state: State): State => ({
          ...state,
          auth: { ...state.auth, password: state.auth.password ? '[PRIVATE]' : '' },
          userLocation: { ...state.userLocation, latitude: 0, longitude: 0 }
        }))
    ));

  geo.subscribe((coords) => {
    store.dispatch(updateUserLocation(coords));
  });

  store.subscribe(() => {
    const state = store.getState();

    const style = getStatusBarStyle(state);
    statusBar.setBarStyle(style, true);

    let page = getCurrentPage(state);
    analytics.logEvent(`page_${page}`);
    analytics.setPage(page);
  });

  api.setJWTFunc(() => auth.jwt());
  auth.onSignOut(() => {
    store.dispatch(signOutComplete());
  });

  keyboard.addListener('keyboardWillChangeFrame', (event) => {
    const {endCoordinates} = event;
    store.dispatch(changeKeyboard(endCoordinates));
  });

  return store;
}
