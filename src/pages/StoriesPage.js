// @flow

import type {ConnectedProps, ExplicitConnectOptions} from '../connect';

import explicitConnect from '../connect';
import React, { Component } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import FastImage from 'react-native-fast-image';
import SubmitButton from '../components/SubmitButton';
import { FooterViewContainer } from '../components/FooterView';
import { launchFBGroup } from '../actions';

type StateProps = {|
|};
type DispatchProps = {|
  onLaunchGroup: () => Promise<void>
|};
type Props = ConnectedProps<{||}, StateProps, DispatchProps> ;

export default class StoriesPage extends Component<Props> {

  render() {
    const {onLaunchGroup} = this.props;
    return (
      <View style={ styles.container }>
        <View style={ styles.body }>
          <View style={ styles.description }>
            <Text style={ styles.pageTitle }>
              Join the Party
            </Text>
            <Text style={ styles.descriptionText }>
              Share your random event experiences with thousands of Third Party users from around the planet. Press below to enter our Facebook group.
            </Text>
          </View>
          <TouchableOpacity
                            style={ styles.groupPreview }
                            onPress={ onLaunchGroup }>
            <FastImage
                       style={ styles.image }
                       resizeMode="cover"
                       source={ require('../assets/facebook-group.jpg') }>
            </FastImage>
            <SubmitButton
                          style={ styles.button }
                          onPress={ onLaunchGroup }
                          label="Join on Facebook"
                          disabled={ false }
                          isLoading={ false } />
          </TouchableOpacity>
        </View>
        <FooterViewContainer />
      </View>);
  }
}

const options: ExplicitConnectOptions<{||}, StateProps, DispatchProps> = {
  component: StoriesPage,
  mapDispatchToProps: dispatch => ({
    onLaunchGroup: async () => {
      await dispatch(launchFBGroup());
    }
  })
};

export const StoriesPageContainer = explicitConnect(options);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    flex: 1
  },
  image: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  groupPreview: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 20
  },
  description: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    zIndex: 10,
    paddingTop: getStatusBarHeight(),
    paddingBottom: 16
  },
  descriptionText: {
    fontFamily: 'Helvetica Neue',
    fontSize: 14,
    color: '#404040',
    lineHeight: 24,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 16,
    paddingRight: 16
  },
  pageTitle: {
    fontFamily: 'Helvetica Neue',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    paddingTop: 15,
    paddingBottom: 15
  },
  button: {
  }
});
