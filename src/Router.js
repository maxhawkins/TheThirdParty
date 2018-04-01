// @flow

import type {ExplicitConnectOptions} from './connect';
import type {Page} from './types';

import explicitConnect from './connect';
import * as Routes from './Routes';
import React, { Component } from 'react';
import { Modal } from 'react-native';
import { getCurrentPage } from './selectors';

type StateProps = {|
  page: Page
|};
type DispatchProps = {||};

const Router = ({page}) => {
  let Route: ?React$ComponentType<*> = Routes[page];

  if (page === 'home') {
    Route = null;
  }

  let animationType = 'fade';
  switch (page) {
    case 'home':
      Route = null; // The home page is always loaded below the modal
      animationType = 'none';
      break;

    case 'profile':
    case 'stories':
      animationType = 'none'
      break;
  }

  return (<Modal
                 animationType={ animationType }
                 visible={ !!Route }>
            { Route ? <Route /> : null }
          </Modal>);
}

const options: ExplicitConnectOptions<{||}, StateProps, DispatchProps> = {
  mapStateToProps: state => ({ page: getCurrentPage(state) }),
  component: Router
};

export const RouterContainer = explicitConnect(options);
export default RouterContainer;
