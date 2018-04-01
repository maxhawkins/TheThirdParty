// @flow

import type {Action} from "../actions";
import { combineReducers } from 'redux';

export function loading(state: boolean = false, action: Action): boolean {
  switch (action.type) {
    // Signup
    case 'SET_SIGNUP_EMAIL_BEGIN':
    case 'SET_LOGIN_EMAIL_BEGIN':
    case 'DO_SIGNUP_BEGIN':
      return true;
    case 'SET_SIGNUP_EMAIL_COMPLETE':
    case 'SET_SIGNUP_EMAIL_ERROR':
    case 'DO_SIGNUP_COMPLETE':
    case 'DO_SIGNUP_ERROR':
      return false;

    // FB Login
    case 'FB_LOGIN_REQUEST':
      return true;
    case 'FB_LOGIN_FAILURE':
    case 'FB_LOGIN_SUCCESS':
    case 'FB_LOGIN_CANCEL':
      return false;

    // Email Login
    case 'DO_LOGIN_BEGIN':
    case 'FB_LOGIN_REQUEST':
      return true;
    case 'SET_LOGIN_EMAIL_COMPLETE':
    case 'SET_LOGIN_EMAIL_ERROR':
    case 'DO_LOGIN_ERROR':
    case 'DO_LOGIN_COMPLETE':
      return false;

    default:
      return state;
  }
}

export function email(state: string = '', action: Action): string {
  switch (action.type) {
    case 'SET_LOGIN_EMAIL_COMPLETE':
    case 'SET_SIGNUP_EMAIL_COMPLETE':
      return action.payload;
    default:
      return state;
  }
}

export function password(state: string = '', action: Action): string {
  switch (action.type) {
    case 'SET_LOGIN_PASSWORD':
    case 'SET_SIGNUP_PASSWORD':
      return action.payload;
    default:
      return state;
  }
}

export function error(state: ?string = '', action: Action): ?string {
  switch (action.type) {
    case 'DO_SIGNUP_ERROR':
    case 'DO_LOGIN_ERROR':
    case 'FB_LOGIN_FAILURE':
    case 'SET_LOGIN_EMAIL_ERROR':
    case 'SET_SIGNUP_EMAIL_ERROR':
      return action.payload.message;
    case 'FB_LOGIN_SUCCESS':
    default:
      return null;
  }
}

export const auth = combineReducers({
  email,
  password,
  error,
  loading
});
export default auth;
