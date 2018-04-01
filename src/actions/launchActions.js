// @flow

import type {ThunkAction} from '../types';

import { generateDest, signOutComplete, checkWaitlist } from './index';

export type Action = LaunchSuccess
| LaunchBegin
| LaunchError;

type LaunchBegin = {|
  type: 'LAUNCH_BEGIN'
|}
export function launchBegin(): LaunchBegin {
  return { type: 'LAUNCH_BEGIN' };
}

type LaunchError = {|
  type: 'LAUNCH_ERROR',
  error: true,
  payload: Error
|};
export function launchError(error: Error): LaunchError {
  return { type: 'LAUNCH_ERROR', payload: error, error: true };
}

type LaunchSuccess = {|
  type: 'LAUNCH_SUCCESS'
|};
export function launchSuccess(): LaunchSuccess {
  return { type: 'LAUNCH_SUCCESS' };
}

export function launch(): ThunkAction {
  return async (dispatch, getState, {
      api,
      auth,
      geo
    }) => {
    try {
      await dispatch(launchBegin());

      const jwt = await auth.jwt();
      if (!jwt) {
        await dispatch(signOutComplete());
        return;
      }

      await dispatch(checkWaitlist());

      await geo.requestPermissions();

      await dispatch(launchSuccess());
    } catch (error) {
      console.warn(error.message);
      await dispatch(launchError(error));
      return;
    }

    await dispatch(generateDest());
  }
}
