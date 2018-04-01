// @flow

import type {ThunkAction} from '../types';

import { AsyncStorage } from 'react-native';

export type Action = GetWaitlistStatus;

type WaitlistStatus = {|
  +place: number,
  +offWaitlist: boolean,
|};
type GetWaitlistStatus = {|
  type: 'GET_WAITLIST_STATUS',
  payload: WaitlistStatus
|};
export function getWaitlistStatus(status: WaitlistStatus): GetWaitlistStatus {
  return { type: 'GET_WAITLIST_STATUS', payload: status };
}

export function checkWaitlist(): ThunkAction {
  return async (dispatch, getState, {auth}) => {

    try {
      let opensesame: ?string = await AsyncStorage.getItem('@opensesame');

      if (opensesame) {
        await dispatch(getWaitlistStatus({
          place: 0,
          offWaitlist: true
        }));

      } else {

        const email = await auth.currentEmail();

        const resp = await fetch('https://signup.findrandomevents.com/check', {
          method: 'POST',
          body: email
        });
        if (resp.status !== 200) {
          return;
        }

        const data = await resp.json();

        if (data.offWaitlist) {
          await AsyncStorage.setItem('@opensesame', 'true');
        }

        await dispatch(getWaitlistStatus(data));
      }

    } catch (error) {
      console.warn(error.message);
    // ignore so it doesn't mess up launch sequence
    }
  }
}
