// @flow

import type {Action} from '../actions';
import type {Page} from '../types';

export function pageStack(state: Array<Page> = ['loading'], action: Action): Array<Page> {
  switch (action.type) {
    // Launch
    case 'LAUNCH_ERROR':
      console.warn(action.payload);
      return state;
    case 'LAUNCH_SUCCESS':
      return ['home'];

    // Email Signup
    case 'EMAIL_SIGNUP_BEGIN':
      return ['signupEmail', ...state];
    case 'SET_SIGNUP_EMAIL_COMPLETE':
      return ['signupPassword', ...state];
    case 'DO_SIGNUP_COMPLETE':
      return ['home'];

    // Email Login
    case 'EMAIL_LOGIN_BEGIN':
      return ['loginEmail', ...state];
    case 'SET_LOGIN_EMAIL_COMPLETE':
      return ['loginPassword', ...state];
    case 'DO_LOGIN_COMPLETE':
      return ['home'];
    case 'PASSWORD_RESET_COMPLETE':
      return ['auth'];

    // Facebook Login
    case 'FB_LOGIN_SUCCESS':
      return ['home'];
    case 'FB_LOGIN_CANCEL':
    case 'FB_LOGIN_FAILURE':
      return state;

    case 'SELECT_EVENT':
      return ['event', ...state];
    case 'OPEN_MAP':
      return ['map', ...state];

    case 'SIGN_OUT_COMPLETE':
      return ['auth'];

    case 'OPEN_PROFILE':
      return ['profile'];
    case 'OPEN_EVENTS':
      return ['home'];
    case 'OPEN_STORIES':
      return ['stories'];

    // Back
    case 'GO_BACK':
    case 'CLOSE_EVENT':
    case 'CLOSE_PROFILE':
    case 'CLOSE_MAP':
      return state.slice(1);

    default:
      return state;
  }
}

export default pageStack;
