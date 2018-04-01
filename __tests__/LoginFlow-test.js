// @flow

import { FAKE_USER } from '../src/API';
import TestContext from '../src/TestContext';
import LoadingPage from '../src/pages/LoadingPage';
import AuthPage from '../src/pages/AuthPage';
import HomePage from '../src/pages/HomePage';
import Dialog from '../src/components/Dialog';
import Button from '../src/components/Button';

import { View } from 'react-native';

describe('login flow', () => {

  // TODO(maxhawkins): implement facebook login
  xtest('bad fb login', async () => {
    const ctx = new TestContext();
    const page = ctx.render();
    await page.instance.componentWillMount();

    expect(page).toHaveComponentWithType(AuthPage);

    // Set FB logins to error
    const error = new Error('fb login failed');
    ctx.fbLogin = {
      login: jest.fn(() => {
        throw error
      })
    };

    // Try to log in anyway.
    const loginButton: Button = page.findByProps({ accessibilityLabel: 'Log In with Facebook' }).instance;
    await loginButton.props.onPress();

    // It sends you back to the login page
    expect(page).toHaveComponentWithType(AuthPage);

    const errBox = page.findByProps({ accessibilityLabel: 'Log In Error' });
    expect(errBox).toHaveProps({ children: error.message });
  });

  // TODO(maxhawkins): implement facebook login
  xtest('bad api login', async () => {
    const ctx = new TestContext();
    const page = ctx.render();
    await page.instance.componentWillMount();

    expect(page).toHaveComponentWithType(AuthPage);

    // Set api logins to error
    const error = new Error('api login failed');
    ctx.api = {
      ...ctx.api,
      login: jest.fn(() => {
        throw error;
      })
    };

    // Try to log in anyway.
    const loginButton: Button = page.findByProps({ accessibilityLabel: 'Log In with Facebook' }).instance;
    await loginButton.props.onPress();

    // It sends you back to the login page
    expect(page).toHaveComponentWithType(AuthPage);

    const errBox = page.findByProps({ accessibilityLabel: 'Log In Error' });
    expect(errBox).toHaveProps({ children: error.message });
  });

  // TODO(maxhawkins): implement facebook login
  xtest('fb login, new user', async () => {
    const ctx = new TestContext();
    const page = ctx.render();

    // First it shows the loader
    expect(page).toHaveComponentWithType(LoadingPage);

    // Then after mount it shows the login page
    await page.instance.componentWillMount();
    expect(page).toHaveComponentWithType(AuthPage);

    // Make the user a new user
    ctx.api = {
      ...ctx.api,
      login: jest.fn(async () => ({
        newUser: true,
        jwt: 'fake-jwt',
        userID: FAKE_USER.id
      }))
    };

    const dialog: Dialog = page.findByProps({ accessibilityLabel: "Log In Options" }).instance;
    expect(dialog.props.visible).toBe(false);

    const findButton: Button = page.findByProps({ accessibilityLabel: "Find an Event" }).instance;
    await findButton.props.onPress();

    expect(dialog.props.visible).toBe(true);

    // Pressing the button logs in with Facebook
    const fbButton: Button = page.findByProps({ accessibilityLabel: 'Continue with Facebook' }).instance;
    await fbButton.props.onPress();
  });

});
