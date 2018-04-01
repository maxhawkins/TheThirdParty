// @flow

import type {Page} from '../types';
import type {ConnectedProps, ExplicitConnectOptions} from '../connect';

import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import FooterTabView from './FooterTabView';
import { getCurrentPage } from '../selectors';
import explicitConnect from '../connect';
import {
    openProfile,
    openEvents,
    openStories
} from '../actions';
import isiPhoneX from '../isiPhoneX';

type StateProps = {|
  currentPage: Page
|};
type DispatchProps = {|
  onStories: () => void,
  onEvents: () => void,
  onProfile: () => void
|};
type Props = ConnectedProps<{||}, StateProps, DispatchProps> ;

export default class FooterView extends React.Component<Props> {
  render() {
    const {
      currentPage,
      onStories,
      onEvents,
      onProfile
    } = this.props;

    return (<View style={ styles.footer }>
              <FooterTabView
                             onPress={ onStories }
                             label="STORIES"
                             icon={ currentPage === 'stories' ? require('../assets/story-on.png') : require('../assets/story-off.png') } />
              <FooterTabView
                             onPress={ onEvents }
                             label="EVENTS"
                             icon={ currentPage === 'home' ? require('../assets/events-on.png') : require('../assets/events-off.png') } />
              <FooterTabView
                             onPress={ onProfile }
                             style={ { borderRightWidth: 0 } }
                             label="PROFILE"
                             icon={ currentPage === 'profile' ? require('../assets/profile-on.png') : require('../assets/profile-off.png') } />
            </View>);
  }
}

const options: ExplicitConnectOptions<{||}, StateProps, DispatchProps> = {
  mapStateToProps: (state) => ({
    currentPage: getCurrentPage(state)
  }),
  mapDispatchToProps: dispatch => ({
    onStories: () => {
      dispatch(openStories());
    },
    onEvents: () => {
      dispatch(openEvents());
    },
    onProfile: () => {
      dispatch(openProfile());
    }
  }),
  component: FooterView
};

export const FooterViewContainer = explicitConnect(options);

const styles = StyleSheet.create({
  footer: {
    height: isiPhoneX() ? (56 + 20) : 56,
    borderTopColor: '#B5B5B5',
    borderTopWidth: 1,
    backgroundColor: 'white',
    flexDirection: 'row'
  }
});
