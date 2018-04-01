// @flow

import type {Analytics, Page} from './types';
import type FBAnalytics from 'react-native-firebase/dist/modules/analytics';
import typeof Firebase from 'react-native-firebase';

export default class FirebaseAnalytics implements Analytics {

  firebase: Firebase;
  analytics: FBAnalytics;

  currentPage: Page;

  constructor() {
    // Import here to avoid triggering side effects on import
    this.firebase = require('react-native-firebase').default;
    this.analytics = this.firebase.app().analytics();

    this.analytics.setAnalyticsCollectionEnabled(true);
  }

  setPage(page: Page) {
    if (this.currentPage !== page) {
      this.analytics.setCurrentScreen(page, page);
      this.currentPage = page;
    }
  }

  logEvent(event: string, params?: Object) {
    this.analytics.logEvent(event, params);
  }

}
