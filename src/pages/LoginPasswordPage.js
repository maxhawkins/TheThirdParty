// @flow

import type {Event, EventID} from '../API';
import type {ConnectedProps, ExplicitConnectOptions} from '../connect';

import {
    doLogin,
    goBack,
    setLoginPassword,
    resetPassword
} from '../actions';
import ToolbarButton from '../components/ToolbarButton';
import Button from '../components/Button';
import Toolbar from '../components/Toolbar';
import SubmitButton from '../components/SubmitButton';
import explicitConnect from '../connect';
import { getSelectedEvent } from '../selectors';
import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput
} from 'react-native';
import MapView from 'react-native-maps';

type StateProps = {|
  keyboardHeight: number,
  loading: boolean,
  initialValue: string,
  error: ?string
|}
type DispatchProps = {|
  onBack: () => Promise<void>,
  onSubmit: (string) => Promise<void>,
  onResetPassword: () => Promise<void>
|}
type Props = ConnectedProps<{||}, StateProps, DispatchProps>

type State = {|
  password: string
|};

class LoginPasswordPage extends Component<Props, State> {

  state = {
    password: ''
  };

  render() {
    const {
      error,
      initialValue,
      keyboardHeight,
      loading,
      onBack,
      onResetPassword,
      onSubmit
    } = this.props;
    const {password} = this.state;

    return (<View style={ [styles.container, { marginBottom: keyboardHeight }] }>
              <Toolbar
                       left={ <ToolbarButton
                                             accessibilityLabel="Back"
                                             image={ require('../assets/back-button.png') }
                                             onPress={ onBack } /> }
                       right={ <ToolbarButton
                                              accessibilityLabel="Reset Password"
                                              image={ require('../assets/dots.png') }
                                              onPress={ onResetPassword } /> }
                       header="Log In" />
              <View style={ styles.body }>
                <Text style={ styles.label }>
                  Choose a password
                </Text>
                <TextInput
                           autoFocus
                           autoCapitalize="none"
                           secureTextEntry={ true }
                           placeholder="Password"
                           placeholderTextColor="#B8B8B8"
                           value={ password }
                           initialValue={ initialValue }
                           onSubmitEditing={ () => onSubmit(password) }
                           onChangeText={ (text: string) => this.setState({ password: text }) }
                           style={ styles.input } />
                { error
                  ? (<Text style={ styles.error }>
                       { error }
                     </Text>)
                  : null }
              </View>
              <SubmitButton
                            onPress={ () => onSubmit(password) }
                            style={ { margin: 16 } }
                            label="Next"
                            disabled={ false }
                            isLoading={ loading } />
            </View>);
  }
}

const options: ExplicitConnectOptions<{||}, StateProps, DispatchProps> = {
  mapStateToProps: (state) => ({
    keyboardHeight: state.keyboard.height,
    loading: state.auth.loading,
    initialValue: state.auth.password,
    error: state.auth.error
  }),
  mapDispatchToProps: dispatch => ({
    onBack: async () => {
      await dispatch(goBack())
    },
    onSubmit: async (password: string) => {
      await dispatch(setLoginPassword(password));
      await dispatch(doLogin());
    },
    onResetPassword: async() => {
      await dispatch(resetPassword());
    }
  }),
  component: LoginPasswordPage
};

export const LoginPasswordPageContainer = explicitConnect(options);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  label: {
    color: '#4D4D4D',
    fontWeight: '500',
    fontFamily: 'Helvetica Neue',
    fontSize: 14
  },
  body: {
    flex: 1,
    marginTop: 120,
    paddingLeft: 16,
    paddingRight: 16
  },
  input: {
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold',
    fontSize: 36,
    height: 60,
    marginTop: 10,
    marginBottom: 10,
    color: '#000'
  },
  note: {
    fontFamily: 'Helvetica Neue',
    fontSize: 14,
    color: '#888'
  },
  error: {
    color: '#E13B16',
    fontFamily: 'Helvetica Neue',
    fontSize: 14
  }
});
