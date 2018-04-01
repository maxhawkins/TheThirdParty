// @flow

import type {Event, EventID} from '../API';
import type {ConnectedProps, ExplicitConnectOptions} from '../connect';

import {
    closeMap,
    goBack,
    openMap,
    setSignupEmail,
    showDirections
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
  onSubmit: (string) => Promise<void>
|}
type Props = ConnectedProps<{||}, StateProps, DispatchProps>

type State = {|
  email: string
|};

class SignupEmailPage extends Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      email: props.initialValue
    };
  }

  render() {
    const {
      error,
      initialValue,
      keyboardHeight,
      loading,
      onBack,
      onSubmit
    } = this.props;
    const {email} = this.state;

    return (<View style={ [styles.container, { marginBottom: keyboardHeight }] }>
              <Toolbar
                       left={ <ToolbarButton
                                             accessibilityLabel="Back"
                                             image={ require('../assets/back-button.png') }
                                             onPress={ onBack } /> }
                       header="Sign Up" />
              <View style={ styles.body }>
                <Text style={ styles.label }>
                  What’s your email?
                </Text>
                <TextInput
                           autoFocus
                           autoCapitalize="none"
                           keyboardType="email-address"
                           placeholder="Email Address"
                           placeholderTextColor="#B8B8B8"
                           value={ email }
                           onSubmitEditing={ () => onSubmit(email) }
                           onChangeText={ (text: string) => this.setState({ email: text }) }
                           style={ styles.input } />
                { error
                  ? (<Text style={ styles.error }>
                       { error }
                     </Text>)
                  : (<Text style={ styles.note }>
                       We don’t spam
                     </Text>) }
              </View>
              <SubmitButton
                            onPress={ () => onSubmit(email) }
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
    error: state.auth.error,
    initialValue: state.auth.email
  }),
  mapDispatchToProps: dispatch => ({
    onBack: async () => {
      await dispatch(goBack())
    },
    onSubmit: async (email: string) => {
      await dispatch(setSignupEmail(email))
    }
  }),
  component: SignupEmailPage
};

export const SignupEmailPageContainer = explicitConnect(options);

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
