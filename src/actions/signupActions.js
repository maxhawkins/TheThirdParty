// @flow

import type {ThunkAction} from '../types';

import { generateDest } from './index';

export type Action = SetSignupEmailBegin
| EmailSignupBegin
| SetSignupEmailError
| SetSignupEmailComplete
| SetSignupPassword
| DoSignupBegin
| DoSignupComplete
| DoSignupError;

type EmailSignupBegin = {|
  +type: 'EMAIL_SIGNUP_BEGIN'
|};
export function emailSignupBegin(): EmailSignupBegin {
  return { type: "EMAIL_SIGNUP_BEGIN" };
}

type SetSignupPassword = {|
  +type: "SET_SIGNUP_PASSWORD",
  +payload: string
|};
export function setSignupPassword(password: string): SetSignupPassword {
  return { type: "SET_SIGNUP_PASSWORD", payload: password };
}

type DoSignupBegin = {|
  +type: "DO_SIGNUP_BEGIN",
|}
export function doSignupBegin(): DoSignupBegin {
  return { type: "DO_SIGNUP_BEGIN" };
}
type DoSignupComplete = {|
  +type: "DO_SIGNUP_COMPLETE",
|}
export function doSignupComplete(): DoSignupComplete {
  return { type: "DO_SIGNUP_COMPLETE" };
}
type DoSignupError = {|
  +type: "DO_SIGNUP_ERROR",
  +error: true,
  +payload: Error
|}
export function doSignupError(error: Error): DoSignupError {
  return { type: "DO_SIGNUP_ERROR", error: true, payload: error };
}

export function doSignup(): ThunkAction {
  return async (dispatch, getState, {auth}) => {
    try {
      await dispatch(doSignupBegin());

      const state = getState();
      const {email, password} = state.auth;
      await auth.signUp(email, password);

      await dispatch(doSignupComplete());
    } catch (error) {
      return dispatch(doSignupError(error));
    }

    await dispatch(generateDest());
  };
}

type SetSignupEmailBegin = {|
  +type: "SET_SIGNUP_EMAIL_BEGIN",
  +payload: string
|};
export function setSignupEmailBegin(email: string): SetSignupEmailBegin {
  return { type: "SET_SIGNUP_EMAIL_BEGIN", payload: email };
}
type SetSignupEmailComplete = {|
  +type: "SET_SIGNUP_EMAIL_COMPLETE",
  +payload: string
|};
export function setSignupEmailComplete(email: string): SetSignupEmailComplete {
  return { type: "SET_SIGNUP_EMAIL_COMPLETE", payload: email };
}
type SetSignupEmailError = {|
  +type: "SET_SIGNUP_EMAIL_ERROR",
  +payload: Error,
  +error: true
|};
export function setSignupEmailError(error: Error): SetSignupEmailError {
  return { type: "SET_SIGNUP_EMAIL_ERROR", payload: error, error: true };
}

export function setSignupEmail(email: string): ThunkAction {
  return async (dispatch, getState, {auth}) => {
    try {
      await dispatch(setSignupEmailBegin(email));

      await auth.validateEmail(email);

      await dispatch(setSignupEmailComplete(email));
    } catch (error) {
      return dispatch(setSignupEmailError(error));
    }
  };
}
