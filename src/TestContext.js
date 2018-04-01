// @flow

import 'react-native';

import type {
    Analytics,
    Auth,
    Deps,
    Keyboard,
    Linking,
    StatusBar,
    Store,
    ErrorLogger
} from './types';
import type {ActionSheet} from './ActionSheet';
import type {API} from './API';
import type {FBLogin} from './fbLogin';
import type {Geolocation} from './Geolocation';
import type {ReactTestInstance, ReactTestRenderer} from 'react-test-renderer';

import { FAKE_USER, FAKE_DEST } from './API';
import Index, { ThirdParty } from '../index.ios';
import makeStore from '../src/store';
import React from 'react';
import renderer from 'react-test-renderer';

export default class TestContext implements Deps {

  actionSheet: ActionSheet;
  analytics: Analytics;
  api: API;
  auth: Auth;
  errorLogger: ErrorLogger;
  fbLogin: FBLogin;
  geo: Geolocation;
  keyboard: Keyboard;
  linking: Linking;
  statusBar: StatusBar;

  store: Store;

  constructor() {
    this.linking = {
      openURL: jest.fn(async () => null)
    };

    this.api = {
      setJWTFunc: jest.fn(() => {
      }),
      generateDest: jest.fn(async () => ({
        events: [],
        dests: []
      })),
      updateDest: jest.fn(async () => FAKE_DEST),
      getDests: jest.fn(async () => [FAKE_DEST]),
      updateUser: jest.fn(async () => FAKE_USER)
    };
    this.geo = {
      subscribe: jest.fn(() => {
      }),
      requestPermissions: jest.fn(async () => {
      }),
      getPosition: jest.fn(async () => ({ latitude: 0, longitude: 0 }))
    }
    this.fbLogin = {
      login: jest.fn(async () => ({
        accessToken: 'fake-fb-token',
        userID: 'fake-fb-id'
      }))
    };

    this.actionSheet = {
      show: jest.fn(async (options: Array<any>) => '')
    };

    this.statusBar = {
      setBarStyle: jest.fn(() => {
      })
    };
    this.keyboard = {
      addListener: () => {
      }
    };

    this.auth = {
      resetPassword: jest.fn(async() => {
      }),
      onSignOut: jest.fn(() => (() => {
      })),
      emailExists: jest.fn(async() => false),
      signUpWithFacebook: jest.fn(async() => {
      }),
      signIn: jest.fn(async () => {
      }),
      signOut: jest.fn(async () => {
      }),
      signUp: jest.fn(async () => {
      }),
      validateEmail: jest.fn(async () => {
      }),
      jwt: jest.fn(async () => null),
      currentEmail: jest.fn(async () => null)
    };

    this.errorLogger = {
      error: jest.fn(() => {
      }),
      info: jest.fn(() => {
      })
    };

    this.store = makeStore(this);
  }

  login() {
    this.auth = {
      ...this.auth,
      jwt: jest.fn(async () => 'logged-in-jwt')
    };
  }

  render(): ReactTestInstance {
    return this.renderer().root;
  }

  renderer(): ReactTestRenderer {
    const component = (<ThirdParty store={ this.store } />);
    return renderer.create(component);
  }
}
