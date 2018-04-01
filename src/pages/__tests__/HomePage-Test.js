// @flow

import 'react-native';

import EventCard from '../../components/EventCard';
import MapCard from '../../components/MapCard';
import HomePage from '../HomePage';
import React from 'react';
import renderer from 'react-test-renderer';
import { FAKE_DEST, FAKE_EVENT } from '../../API';

// FIXME(maxhawkins):
xtest('renders loading page when loading', () => {
  const root = renderer.create(<HomePage
                                         dests={ [] }
                                         userLocation={ null }
                                         isLoading={ true }
                                         error={ null }
                                         currentSection="next-event"
                                         onSectionChange={ async () => {
                                                           } }
                                         onDirections={ async () => {
                                                        } }
                                         onMap={ async () => {
                                                 } }
                                         onProfile={ async () => {
                                                     } }
                                         onRefresh={ async () => {
                                                     } }
                                         onSelectEvent={ async () => {
                                                         } } />).root;

  const card = root.findByType(EventCard);
  expect(card.props.loading).toBe(true);

  const map = root.findByType(MapCard);
  expect(map.props.loading).toBe(true);
});

test('renders event card when event is provided', () => {
  const event = {
    ...FAKE_EVENT
  };
  const dests = [{
    ...FAKE_DEST,
    event: event
  }];
  const root = renderer.create(<HomePage
                                         dests={ dests }
                                         userLocation={ null }
                                         isLoading={ false }
                                         currentSection={ 'next-event' }
                                         error={ null }
                                         onSectionChange={ async () => {
                                                           } }
                                         onDirections={ async () => {
                                                        } }
                                         onMap={ async () => {
                                                 } }
                                         onProfile={ async () => {
                                                     } }
                                         onRefresh={ async () => {
                                                     } }
                                         onSelectEvent={ async () => {
                                                         } } />).root;

  const card = root.findByType(EventCard);
  expect(card.props.event).toEqual(event);
  expect(card.props.loading).toBe(false);
});

test('selects event when card is selected', () => {
  const mockSelectEvent = jest.fn();
  const event = {
    ...FAKE_EVENT
  };
  const dests = [{
    ...FAKE_DEST,
    event: event
  }];

  const root = renderer.create(<HomePage
                                         dests={ dests }
                                         userLocation={ null }
                                         isLoading={ false }
                                         error={ null }
                                         currentSection="next-event"
                                         onSectionChange={ async () => {
                                                           } }
                                         onDirections={ async () => {
                                                        } }
                                         onMap={ async () => {
                                                 } }
                                         onProfile={ async () => {
                                                     } }
                                         onRefresh={ async () => {
                                                     } }
                                         onSelectEvent={ mockSelectEvent } />).root;

  const card = root.findByType(EventCard);
  card.props.onPress();

  expect(mockSelectEvent).toBeCalledWith(event.id);
});
