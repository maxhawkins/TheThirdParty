// @flow

import 'react-native';

import NoDests from '../NoDests';
import React from 'react';
import renderer from 'react-test-renderer';

test('renders', () => {
  const root = renderer.create(<NoDests />).root;
});
