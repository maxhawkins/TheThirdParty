// @flow

import type {Action} from './actions';
import type {ActionSheet} from './ActionSheet';
import type { API } from './API';
import type { FBLogin } from './fbLogin';
import type { Geolocation } from './Geolocation';
import type { State as ReducerState } from './reducers';
import type {
    MiddlewareAPI as MiddlewareAPIT,
    Middleware as MiddlewareT,
    Store as StoreT
} from 'redux';
import typeof * as Routes from './Routes';

// Interfaces:

export interface Linking {
  openURL(string): Promise<any>;
}

export interface Analytics {
  setPage(page: Page): void;
  logEvent(event: string, params?: Object): void;
}

type StatusBarStyle = 'default'|'light-content'|'dark-content';
export interface StatusBar {
  setBarStyle(style: StatusBarStyle, animated?: boolean): void;
};

type KeyboardCoordinates = {|
  height: number,
|};
type KeyboardWillChangeFrameEvent = {
  endCoordinates: KeyboardCoordinates,
};
export interface Keyboard {
  addListener('keyboardWillChangeFrame', (KeyboardWillChangeFrameEvent) => void): void;
};

export type HomePageSection = 'refresh' | 'next-event' | 'history';

export interface Auth {
  // Sign Up
  emailExists(email: string): Promise<boolean>;
  validateEmail(email: string): Promise<void>;
  signUp(email: string, password: string): Promise<void>;

  // Facebook
  signUpWithFacebook(accessToken: string): Promise<void>;

  // Sign In
  signIn(email: string, password: string): Promise<void>;
  resetPassword(email: string): Promise<void>;

  signOut(): Promise<void>;
  jwt(): Promise<?string>;
  onSignOut(() => void): () => void;

  // Temporary for wait list
  currentEmail(): Promise<?string>;
}

export interface ErrorLogger {
  error(message: string, meta: {[string]: any}): void;
  info(message: string): void;
}

export interface Deps {
  actionSheet: ActionSheet,
  analytics: Analytics,
  api: API,
  auth: Auth,
  errorLogger: ErrorLogger,
  fbLogin: FBLogin,
  geo: Geolocation,
  keyboard: Keyboard,
  linking: Linking,
  statusBar: StatusBar,
};

export type State = ReducerState;
export type Reducer = (state: State, action: Action) => State
export type Dispatch = (action: Action | ThunkAction) => Action | ThunkAction;
export type GetState = () => State;
export type ThunkAction = (dispatch: Dispatch, getState: GetState, deps: Deps) => any;
export type Middleware = MiddlewareT<State, Action, Dispatch> ;
export type MiddlewareAPI = MiddlewareAPIT<State, Action, Dispatch> ;
export type Store = StoreT<State, Action, Dispatch>

export type Page = $Keys<Routes>;
