// @flow

import 'react-native';

import AuthPage from '../AuthPage';
import React from 'react';
import { TouchableHighlight } from 'react-native';
import renderer from 'react-test-renderer';

test('renders', () => {
  const root = renderer.create(<AuthPage
                                         loading={ false }
                                         onLogin={ async () => {
                                                   } }
                                         onShowPrivacy={ async () => {
                                                         } }
                                         onShowTOS={ async () => {
                                                     } }
                                         onFacebookSignup={ async() => {
                                                            } }
                                         onEmailSignup={ async () => {
                                                         } } />).root;
});

test('calls onLogin when you click the button', async () => {
  var mockOnEmailSignup = jest.fn(async () => {
  });
  const root = renderer.create(<AuthPage
                                         loading={ false }
                                         onShowTOS={ async () => {
                                                     } }
                                         onShowPrivacy={ async () => {
                                                         } }
                                         onLogin={ async () => {
                                                   } }
                                         onFacebookSignup={ async() => {
                                                            } }
                                         onEmailSignup={ mockOnEmailSignup } />).root;

  const dialog = root.findByProps({ accessibilityLabel: "Log In Options" });
  expect(dialog.props.visible).toBe(false);

  const findButton = root.findByProps({ accessibilityLabel: "Find an Event" });
  await findButton.props.onPress();

  expect(dialog.props.visible).toBe(true);

  const signupButton = root.findByProps({ accessibilityLabel: "Sign Up with Email" });
  await signupButton.props.onPress();

  expect(mockOnEmailSignup).toBeCalled();
});
