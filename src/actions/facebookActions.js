// @flow

import type {ThunkAction} from '../types';

import { USER_ME } from '../API';
import { generateDest } from './index';

export type Action = FBLoginRequest
| FBLoginFailure
| FBLoginSuccess
| FBLoginCancel;

type FBLoginRequest = {|
  type: 'FB_LOGIN_REQUEST'
|};
export function fbLoginRequest(): FBLoginRequest {
  return { type: 'FB_LOGIN_REQUEST' };
}

type FBLoginFailure = {|
  type: 'FB_LOGIN_FAILURE',
  payload: Error,
  error: true
|};
export function fbLoginFailure(error: Error): FBLoginFailure {
  return { type: 'FB_LOGIN_FAILURE', payload: error, error: true };
}

type FBLoginSuccess = {|
  type: 'FB_LOGIN_SUCCESS'
|};
export function fbLoginSuccess(): FBLoginSuccess {
  return { type: 'FB_LOGIN_SUCCESS' };
}

type FBLoginCancel = {|
  type: 'FB_LOGIN_CANCEL'
|};
export function fbLoginCancel(): FBLoginCancel {
  return { type: 'FB_LOGIN_CANCEL' };
}

export function fbLoginBegin(): ThunkAction {
  return async function(dispatch, getState, {
      api,
      auth,
      fbLogin
    }) {
    await dispatch(fbLoginRequest());

    try {
      const result = await fbLogin.login();
      if (!result) {
        await dispatch(fbLoginCancel());
        return;
      }

      try {
        await auth.signUpWithFacebook(result.accessToken);
      } catch (error) {
        switch (error.code) {
          case 'auth/account-exists-with-different-credential':
            console.warn('account exists');
            break;
          default:
            throw error;
        }
      }

      await api.updateUser(USER_ME, {
        facebookToken: result.accessToken,
        facebookID: result.userID,
        mask: 'facebookToken,facebookID'
      });

      await dispatch(fbLoginSuccess());

    } catch (error) {
      await dispatch(fbLoginFailure(error));
      return;
    }

    await dispatch(generateDest());
  };
}

export function launchFBGroup(): ThunkAction {
  return async (dispatch, getState, {linking}) => {
    await linking.openURL('https://facebook.com/groups/the3rdparty');
  }
}
