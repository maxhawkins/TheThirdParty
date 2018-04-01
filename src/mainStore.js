// @flow

import type {Action} from './actions';

import ActionSheet from './ActionSheet';
import API from './API';
import CrashlyticsLogger from './CrashlyticsLogger';
import FBLogin from './fbLogin';
import FirebaseAuth from './FirebaseAuth';
import FirebaseAnalytics from './FirebaseAnalytics';
import Geolocation from './Geolocation';
import makeStore from './store';

import {
    Linking,
    StatusBar,
    Keyboard
} from 'react-native';

function MainStore() {
  const BACKEND_URL = process.env.API_URL || 'https://backend.findrandomevents.com';

  const api = new API(BACKEND_URL);

  const store = makeStore({
    actionSheet: new ActionSheet(),
    analytics: new FirebaseAnalytics(),
    api: api,
    auth: new FirebaseAuth(),
    errorLogger: new CrashlyticsLogger(),
    fbLogin: new FBLogin(),
    geo: new Geolocation(),
    keyboard: Keyboard,
    linking: Linking,
    statusBar: StatusBar
  });

  return store;
}

export default MainStore;
