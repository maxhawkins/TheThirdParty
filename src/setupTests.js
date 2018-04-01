// @flow

import type {ReactTestInstance} from 'react-test-renderer';

import expect from 'expect';

// Stub out code push HOC
jest.mock('react-native-code-push', () => (x) => x);

// Stub out Loader (it uses Lottie which I don't have a mock
// for at the moment)
jest.mock('../src/components/Loader', () => () => null);

// Stub out timers to avoid bad interaction between Jest's RN mocks
// and the Animation library.
jest.useFakeTimers();
// $FlowFixMe
Date.now = jest.fn(() => 1503187200000);

// Stub out React Native Maps
jest.mock('react-native-maps', () => {
  var MapView = () => null;
  MapView.Marker = () => null;
  return MapView;
});

type ExpectResult = {|
  message: () => string,
  pass: boolean
|};

function toHaveProps(component: ReactTestInstance, wantProps: {[propName: string]: any}) {
  const gotProps = { }
  for (let key in wantProps) {
    gotProps[key] = component.props[key];
  }
  const pass = this.equals(gotProps, wantProps);

  const message = pass
    ? () => this.utils.matcherHint('.not.toHaveProps') +
      '\n\n' +
      `Expected component to not have props:\n` +
      `   ${this.utils.printExpected(wantProps)}\n` +
      `Received:\n` +
      `  ${this.utils.printReceived(gotProps)}\n`
    : () => this.utils.matcherHint('.toHaveProps') +
      '\n\n' +
      'Expected component to have props:\n' +
      `  ${this.utils.printExpected(wantProps)}\n` +
      `Received:\n` +
      `  ${this.utils.printReceived(gotProps)}\n`;

  return { message, pass };
}

function toHaveComponentWithType(received: ReactTestInstance, type: React$ComponentType<*>) {
  const pass = received.findAllByType(type).length > 0;
  if (pass) {
    return {
      message: () => `expected page not to have component with type ${type.name}`,
      pass: true
    }
  } else {
    return {
      message: () => `expected page to have component with type ${type.name}`,
      pass: false
    }
  }
}

// Add matchers for finding components in the render tree.
expect.extend({
  toHaveProps,
  toHaveComponentWithType
});
