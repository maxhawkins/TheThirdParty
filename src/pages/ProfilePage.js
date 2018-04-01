// @flow

import type {ConnectedProps, ExplicitConnectOptions} from '../connect';

import explicitConnect from '../connect';
import React, { Component } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
    StyleSheet,
    View,
    Button,
    TouchableHighlight,
    Text
} from 'react-native';
import { FooterViewContainer } from '../components/FooterView';
import { signOut } from '../actions';

type StateProps = {|
|};
type DispatchProps = {|
  onSignOut: () => void
|};
type Props = ConnectedProps<{||}, StateProps, DispatchProps> ;

export default class ProfilePage extends Component<Props> {

  render() {
    const {onSignOut} = this.props;

    return (
      <View style={ styles.container }>
        <View style={ styles.body }>
          <Text style={ styles.sectionHead }>
            Your Account
          </Text>
          <TouchableHighlight
                              underlayColor="#FAFAFA"
                              style={ styles.signoutButton }
                              onPress={ onSignOut }>
            <Text style={ styles.signoutText }>
              Sign Out
            </Text>
          </TouchableHighlight>
        </View>
        <FooterViewContainer />
      </View>);
  }
}

const options: ExplicitConnectOptions<{||}, StateProps, DispatchProps> = {
  mapDispatchToProps: dispatch => ({
    onSignOut: () => {
      dispatch(signOut());
    }
  }),
  component: ProfilePage
};

export const ProfilePageContainer = explicitConnect(options);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    flex: 1,
    marginTop: getStatusBarHeight() + 30
  },
  signoutButton: {
    borderColor: '#F2F2F2',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingTop: 15,
    paddingBottom: 15
  },
  signoutText: {
    textAlign: 'center',
    fontFamily: 'Helvetica Neue',
    fontSize: 14,
    color: '#E13B16'
  },
  sectionHead: {
    fontFamily: 'Helvetica Neue',
    fontSize: 14,
    fontWeight: '500',
    color: '#4D4D4D',
    paddingLeft: 16,
    marginBottom: 15
  }
});
