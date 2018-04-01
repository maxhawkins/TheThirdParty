// @flow

import type {EventID} from '../api';
import type {ThunkAction} from '../types';

import { ActionSheetIOS, Linking } from 'react-native';

export type Action = SendFeedbackRequest
| SendFeedbackError
| SendFeedbackSuccess
| ShowDirectionsStart
| ShowDirectionsComplete
| ShowFacebookStart
| SelectEvent
| CloseEvent
| CloseMap
| OpenMap
| OpenEvents;

type SendFeedbackRequest = {|
  type: 'SEND_FEEDBACK_REQUEST',
  payload: ?string
|};
export function sendFeedbackRequest(feedback: ?string): SendFeedbackRequest {
  return { type: 'SEND_FEEDBACK_REQUEST', payload: feedback };
}

type SendFeedbackError = {|
  type: 'SEND_FEEDBACK_ERROR',
  error: true,
  payload: Error
|};
export function sendFeedbackError(error: Error): SendFeedbackError {
  return { type: 'SEND_FEEDBACK_ERROR', payload: error, error: true };
}

type SendFeedbackSuccess = {|
  type: 'SEND_FEEDBACK_SUCCESS',
  payload: ?string
|};
export function sendFeedbackSuccess(feedback: ?string) {
  return { type: 'SEND_FEEDBACK_SUCCESS', payload: feedback };
}

export function sendFeedback(type: ?string): ThunkAction {
  return async function(dispatch) {
    await dispatch(sendFeedbackRequest(type));
    await dispatch(sendFeedbackSuccess(type));
  };
}

type ShowDirectionsStart = {|
  type: 'SHOW_DIRECTIONS_START',
  meta: {|
    eventID: EventID
  |}
|};
export function showDirectionsStart(eventID: EventID): ShowDirectionsStart {
  return { type: 'SHOW_DIRECTIONS_START', meta: { eventID } };
}

type ShowDirectionsComplete = {|
  type: 'SHOW_DIRECTIONS_COMPLETE',
  meta: {|
    eventID: EventID
  |}
|};
export function showDirectionsComplete(eventID: EventID): ShowDirectionsComplete {
  return { type: 'SHOW_DIRECTIONS_COMPLETE', meta: { eventID } };
}

export function showDirections(eventID: EventID): ThunkAction {
  return async function(dispatch, getState, {
      actionSheet,
      linking
    }) {
    await dispatch(showDirectionsStart(eventID));

    const selection = await actionSheet.show([
      {
        key: 'cancel',
        label: 'Cancel',
        isCancel: true
      },
      {
        key: 'apple',
        label: 'Use Apple Maps'
      },
      {
        key: 'google',
        label: 'Use Google Maps'
      }
    ]);

    const {events} = getState();
    const event = events.data[eventID];
    const {latitude, longitude, place} = event;

    switch (selection) {
      case 'google':
        var url = `https://www.google.com/maps/?center=${latitude},${longitude}&q=${place}&zoom=14`;
        await linking.openURL(url);
        break;

      case 'apple':
        var url = `http://maps.apple.com/?ll=${latitude},${longitude}&q=${place}`;
        await linking.openURL(url);
        break;
    }

    await dispatch(showDirectionsComplete(eventID));
  }
}

type ShowFacebookStart = {|
  type: 'SHOW_FACEBOOK_START',
  meta: {|
    eventID: EventID
  |}
|};

export function showFacebookStart(eventID: EventID): ShowFacebookStart {
  return { type: 'SHOW_FACEBOOK_START', meta: { eventID } };
}

export function showFacebook(eventID: EventID): ThunkAction {
  return async function(dispatch, getState) {
    dispatch(showFacebookStart(eventID));

    const url = `https://facebook.com/events/${String(eventID)}`;
    await Linking.openURL(url);
  }
}

type SelectEvent = {|
  type: 'SELECT_EVENT',
  payload: EventID
|}
export function selectEvent(id: EventID): SelectEvent {
  return { type: 'SELECT_EVENT', payload: id };
}

type CloseEvent = {|
  type: 'CLOSE_EVENT'
|};
export function closeEvent(): CloseEvent {
  return { type: 'CLOSE_EVENT' };
}

type OpenMap = {|
  type: 'OPEN_MAP',
  payload: EventID
|};
export function openMap(eventID: EventID): OpenMap {
  return { type: 'OPEN_MAP', payload: eventID };
}

type CloseMap = {|
  type: 'CLOSE_MAP'
|};
export function closeMap(): CloseMap {
  return { type: 'CLOSE_MAP' };
}

type OpenEvents = {|
  type: 'OPEN_EVENTS'
|};
export function openEvents(): OpenEvents {
  return { type: 'OPEN_EVENTS' };
}
