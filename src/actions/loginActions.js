// @flow

import type {ThunkAction} from '../types';

import { generateDest } from './index';

import { Alert } from 'react-native';

export type Action = EmailLoginBegin
| SetLoginEmailBegin
| SetLoginEmailError
| SetLoginEmailComplete
| SetLoginPassword
| DoLoginBegin
| DoLoginComplete
| DoLoginError
| PasswordResetComplete;

type EmailLoginBegin = {|
  +type: 'EMAIL_LOGIN_BEGIN'
|};
export function emailLoginBegin(): EmailLoginBegin {
  return { type: "EMAIL_LOGIN_BEGIN" };
}

type SetLoginEmailBegin = {|
  +type: "SET_LOGIN_EMAIL_BEGIN",
  +payload: string
|};
export function setLoginEmailBegin(email: string): SetLoginEmailBegin {
  return { type: "SET_LOGIN_EMAIL_BEGIN", payload: email };
}
type SetLoginEmailComplete = {|
  +type: "SET_LOGIN_EMAIL_COMPLETE",
  +payload: string
|};
export function setLoginEmailComplete(email: string): SetLoginEmailComplete {
  return { type: "SET_LOGIN_EMAIL_COMPLETE", payload: email };
}
type SetLoginEmailError = {|
  +type: "SET_LOGIN_EMAIL_ERROR",
  +payload: Error,
  +error: true
|};
export function setLoginEmailError(error: Error): SetLoginEmailError {
  return { type: "SET_LOGIN_EMAIL_ERROR", payload: error, error: true };
}

export function setLoginEmail(email: string): ThunkAction {
  return async (dispatch, getState, {auth}) => {
    try {
      await dispatch(setLoginEmailBegin(email));

      const emailExists = await auth.emailExists(email);
      if (!emailExists) {
        throw new Error(`Couldn't find that email. Try signing up instead.`);
      }

      await dispatch(setLoginEmailComplete(email));
    } catch (error) {
      return dispatch(setLoginEmailError(error));
    }
  };
}

type SetLoginPassword = {|
  +type: "SET_LOGIN_PASSWORD",
  +payload: string
|};
export function setLoginPassword(password: string): SetLoginPassword {
  return { type: "SET_LOGIN_PASSWORD", payload: password };
}

type DoLoginBegin = {|
  +type: "DO_LOGIN_BEGIN",
|}
export function doLoginBegin(): DoLoginBegin {
  return { type: "DO_LOGIN_BEGIN" };
}
type DoLoginComplete = {|
  +type: "DO_LOGIN_COMPLETE",
|}
export function doLoginComplete(): DoLoginComplete {
  return { type: "DO_LOGIN_COMPLETE" };
}
type DoLoginError = {|
  +type: "DO_LOGIN_ERROR",
  +error: true,
  +payload: Error
|}
export function doLoginError(error: Error): DoLoginError {
  return { type: "DO_LOGIN_ERROR", error: true, payload: error };
}

export function doLogin(): ThunkAction {
  return async (dispatch, getState, {auth}) => {
    try {
      await dispatch(doLoginBegin());

      const state = getState();
      const {email, password} = state.auth;

      await auth.signIn(email, password);

      await dispatch(doLoginComplete());
    } catch (error) {
      return dispatch(doLoginError(error));
    }

    await dispatch(generateDest());
  };
}

type PasswordResetComplete = {|
  +type: 'PASSWORD_RESET_COMPLETE'
|};
function passwordResetComplete(): PasswordResetComplete {
  return { type: 'PASSWORD_RESET_COMPLETE' };
}

export function resetPassword(): ThunkAction {
  return async (dispatch, getState, {auth}) => {
    const state = getState();
    const {email} = state.auth;

    const send: boolean = await new Promise((resolve) => {
      Alert.alert(
        'Forgot your password?',
        `We will send password recovery instructions to ${email}`,
        [
          { text: 'Cancel', style: 'cancel', onPress: () => resolve(false) },
          { text: 'Send', onPress: () => resolve(true) },
          { onDismiss: () => resolve(false) }
        ]);
    });

    if (send) {
      await auth.resetPassword(email);

      await dispatch(passwordResetComplete());
      Alert.alert('Sent!', `Check ${email} to recover your password.`);
    }

  }
}
