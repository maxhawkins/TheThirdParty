// @flow

import type {ErrorLogger} from './types';
import type Crashlytics from 'react-native-firebase/dist/modules/fabric/crashlytics';

export default class CrashlyticsLogger implements ErrorLogger {

  crashlytics: Crashlytics;

  constructor() {
    const firebase = require('react-native-firebase').default;

    this.crashlytics = firebase.fabric.crashlytics();
  }

  info(message: string) {
    this.crashlytics.log(message);
  }

  error(message: string, meta: {[string]: any}) {
    console.warn('Error: ' + message);

    for (var key in meta) {
      let value: string;
      if (typeof meta[key] === 'string') {
        value = meta[key];
      } else {
        value = JSON.stringify(meta[key], null, 2);
      }

      this.crashlytics.setStringValue(key, value);
    }

    this.crashlytics.recordError(0, message);
  }
}
