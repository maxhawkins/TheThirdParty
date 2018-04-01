// @flow

import type {ThunkAction} from '../types';

export type Action = ChangeKeyboardAction
| GoBackAction
| SignOutCompleteAction;

type KeyboardDimensions = {|
  +height: number
|};
type ChangeKeyboardAction = {|
  +type: 'CHANGE_KEYBOARD',
  +payload: KeyboardDimensions
|};
export function changeKeyboard(coords: KeyboardDimensions): ChangeKeyboardAction {
  return { type: 'CHANGE_KEYBOARD', payload: coords };
}

type GoBackAction = {|
  +type: 'GO_BACK',
|};
export function goBack(): GoBackAction {
  return { type: 'GO_BACK' };
}

type SignOutCompleteAction = {|
  +type: 'SIGN_OUT_COMPLETE',
|};
export function signOutComplete(): SignOutCompleteAction {
  return { type: 'SIGN_OUT_COMPLETE' };
}

export function signOut(): ThunkAction {
  return async (dispatch, getState, {auth}) => {
    await auth.signOut();
    await dispatch(signOutComplete());
  }
}
