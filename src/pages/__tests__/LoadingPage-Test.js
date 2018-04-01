// @flow

import 'react-native';

import LoadingPage from '../LoadingPage';
import React from 'react';
import renderer from 'react-test-renderer';

jest.mock('../../components/Loader', () => () => null);

test('renders', () => {
  const root = renderer.create(<LoadingPage />).root;
});
