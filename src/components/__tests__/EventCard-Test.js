// @flow

import 'react-native';

import EventCard, { formattedDay } from '../EventCard';
import { FAKE_EVENT } from '../../API';
import React from 'react';
import renderer from 'react-test-renderer';

test('renders the cover image', () => {
  const event = { ...FAKE_EVENT, cover: 'fake-cover' };
  const root = renderer.create(<EventCard
                                          onPress={ () => null }
                                          loading={ false }
                                          event={ event } />).root;

  const image = root.findByProps({ accessibilityLabel: 'Cover Image' });
  expect(image.props.source).toMatchObject({ uri: event.cover });
});

describe('formattedDay', () => {
  const tests = [
    {
      name: 'day before yesterday',
      date: '2017-12-06T21:00:00',
      now: '2017-12-08T05:00:00',
      expected: '12/06'
    },
    {
      name: 'yesterday',
      date: '2017-12-07T21:00:00',
      now: '2017-12-08T05:00:00',
      expected: 'yesterday'
    },
    {
      name: 'later today',
      date: '2017-12-08T10:00:00',
      now: '2017-12-08T05:00:00',
      expected: 'today'
    },
    {
      name: 'tonight',
      date: '2017-12-08T21:00:00',
      now: '2017-12-08T05:00:00',
      expected: 'tonight'
    },
    {
      name: 'tomorrow morning',
      date: '2017-12-09T10:00:00',
      now: '2017-12-08T05:00:00',
      expected: 'tomorrow'
    },
    {
      name: 'tomorrow night',
      date: '2017-12-09T21:00:00',
      now: '2017-12-08T05:00:00',
      expected: 'tomorrow'
    },
    {
      name: 'day after tomorrow',
      date: '2017-12-10T21:00:00',
      now: '2017-12-08T05:00:00',
      expected: '12/10'
    }
  ]

  tests.forEach((t) => test(t.name, () => {
    const got = formattedDay(t.date, t.now);
    expect(got).toEqual(t.expected);
  })
  );
});
