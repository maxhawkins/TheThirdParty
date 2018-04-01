// @flow

import type {ConnectedProps, ExplicitConnectOptions} from '../connect';

import {
    fbLoginBegin,
    emailSignupBegin,
    emailLoginBegin
} from '../actions';
import ActionSheetRow from '../components/ActionSheetRow';
import Dialog from '../components/Dialog';
import explicitConnect from '../connect';
import React, { Component } from 'react';
import {
    AppRegistry,
    Image,
    Modal,
    StyleSheet,
    Text,
    Linking,
    View
} from 'react-native';
import { Button } from 'react-native-elements';
import { getStatusBarHeight } from 'react-native-status-bar-height';

type StateProps = {|
  loading: boolean
|}
type DispatchProps = {|
  onLogin: () => Promise<void>,
  onEmailSignup: () => Promise<void>,
  onFacebookSignup: () => Promise<void>,
  onShowTOS: () => Promise<void>,
  onShowPrivacy: () => Promise<void>
|}
type Props = ConnectedProps<{||}, StateProps, DispatchProps> ;

type State = {|
  dialogVisible: boolean
|}

export default class AuthPage extends Component<Props, State> {

  state = {
    dialogVisible: false
  }

  render() {
    const {
      onLogin,
      onEmailSignup,
      onFacebookSignup,
      onShowPrivacy,
      onShowTOS
    } = this.props;
    const {dialogVisible} = this.state;

    return (
      <View style={ styles.container }>
        <View style={ styles.top }>
          <Image source={ require('../assets/spiral.png') } />
        </View>
        <Button
                accessibilityLabel="Find an Event"
                onPress={ () => this.setState({ dialogVisible: true }) }
                buttonStyle={ styles.button }
                textStyle={ styles.buttonText }
                title={ `FIND AN EVENT` } />
        <Text style={ styles.disclaimer }>
          { "By continuing you agree to The Third Party’s " }
          <Text
                onPress={ () => onShowTOS() }
                style={ styles.link }>
            { "Terms of Service" }
          </Text>
          { " and " }
          <Text
                onPress={ () => onShowPrivacy() }
                style={ styles.link }>
            { "Privacy Policy" }
          </Text>
        </Text>
        <Dialog
                style={ styles.logInDialog }
                accessibilityLabel="Log In Options"
                onClose={ () => this.setState({ dialogVisible: false }) }
                visible={ dialogVisible }>
          <ActionSheetRow
                          onPress={ () => {
                                      this.setState({ dialogVisible: false });
                                      onFacebookSignup();
                                    } }
                          label="Continue with Facebook"
                          image={ require('../assets/fb-icon.png') } />
          <ActionSheetRow
                          onPress={ () => {
                                      this.setState({ dialogVisible: false });
                                      onEmailSignup();
                                    } }
                          label="Sign Up with Email"
                          image={ require('../assets/email-icon.png') } />
          <ActionSheetRow
                          onPress={ () => {
                                      this.setState({ dialogVisible: false });
                                      onLogin();
                                    } }
                          label="Log In" />
        </Dialog>
      </View>);
  }
}

const options: ExplicitConnectOptions<{||}, StateProps, DispatchProps> = {
  mapStateToProps: (state) => ({
    loading: state.auth.loading
  }),
  mapDispatchToProps: dispatch => ({
    onLogin: async () => {
      await dispatch(emailLoginBegin());
    },
    onEmailSignup: async () => {
      await dispatch(emailSignupBegin());
    },
    onFacebookSignup: async () => {
      await dispatch(fbLoginBegin());
    },
    onShowTOS: async () => {
      Linking.openURL('https://findrandomevents.com/terms');
    },
    onShowPrivacy: async () => {
      Linking.openURL('https://findrandomevents.com/privacy');
    }
  }),
  component: AuthPage
};

export const AuthPageContainer = explicitConnect(options);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E13B16',
    padding: 10,
    paddingBottom: 30,
    paddingTop: getStatusBarHeight() + 30
  },
  button: {
    backgroundColor: '#E13B16',
    borderColor: 'white',
    borderWidth: 2,
    padding: 20,
    alignItems: 'center',
    borderRadius: 40
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Helvetica Neue',
    fontWeight: '500',
    fontSize: 20,
    letterSpacing: 1
  },
  link: {
    textDecorationLine: 'underline'
  },
  logInDialog: {
    backgroundColor: 'white'
  },
  disclaimer: {
    fontFamily: 'Helvetica Neue',
    textAlign: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 24,
    fontSize: 14,
    lineHeight: 16,
    color: 'rgba(255,255,255,0.6)'
  },
  top: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10
  }
});
