// @flow

import type {Dest, DestID, DestsListResponse} from '../API';
import type {ThunkAction} from "../types";

export type Action = GenerateDestSuccess
| ListDestsSuccess
| ListDestsError
| ListDestsRequest
| AcceptDestRequest
| AcceptDestError
| AcceptDestSuccess
| RejectDest
| GenerateDestRequest
| GenerateDestError;

type AcceptDestRequest = {|
  +type: 'ACCEPT_DEST_REQUEST',
  +meta: {|
    +destID: DestID
  |}
|};

export function acceptDestRequest(destID: DestID): AcceptDestRequest {
  return {
    type: 'ACCEPT_DEST_REQUEST',
    meta: { destID }
  };
}

type AcceptDestError = {|
  +type: 'ACCEPT_DEST_ERROR',
  +error: true,
  +payload: Error,
  +meta: {|
    +destID: DestID
  |}
|};

export function acceptDestError(destID: DestID, error: Error): AcceptDestError {
  return {
    type: 'ACCEPT_DEST_ERROR',
    payload: error,
    error: true,
    meta: { destID }
  };
}

type AcceptDestSuccess = {|
  +type: 'ACCEPT_DEST_SUCCESS',
  +meta: {|
    +destID: DestID
  |}
|};

export function acceptDestSuccess(destID: DestID): AcceptDestSuccess {
  return {
    type: 'ACCEPT_DEST_SUCCESS',
    meta: { destID }
  };
}

export function acceptDest(destID: DestID): ThunkAction {
  return async (dispatch, getState, {api}) => {
    dispatch(acceptDestRequest(destID));

    try {
      await api.updateDest(destID, {
        status: 'going'
      });

      dispatch(acceptDestSuccess(destID));

    } catch (error) {
      console.warn('accept dest: ' + error.message);
      dispatch(acceptDestError(destID, error.message));
    }
  };
}

type ListDestsRequest = {|
  +type: 'LIST_DESTS_REQUEST'
|};

export function listDestsRequest(): ListDestsRequest {
  return { type: 'LIST_DESTS_REQUEST' };
}

type ListDestsError = {|
  +type: 'LIST_DESTS_ERROR',
  +payload: Error,
  +error: true
|};

export function listDestsError(error: Error): ListDestsError {
  return { type: 'LIST_DESTS_ERROR', payload: error, error: true };
}

type ListDestsSuccess = {|
  +type: 'LIST_DESTS_SUCCESS',
  +payload: Array<Dest>
|};
export function listDestsSuccess(resp: Array<Dest>): ListDestsSuccess {
  return { type: 'LIST_DESTS_SUCCESS', payload: resp };
}

export function listDests(): ThunkAction {
  return async function(dispatch, getState, {api}) {
    dispatch(listDestsRequest());

    try {
      var dests = await api.getDests();

      dispatch(listDestsSuccess(dests));
    } catch (error) {
      dispatch(listDestsError(error));
      return;
    }
  };
}

type RejectDest = {|
  type: 'REJECT_DEST',
  payload: DestID
|};

export function rejectDest(destID: DestID): RejectDest {
  return { type: 'REJECT_DEST', payload: destID };
}

type GenerateDestRequest = {|
  type: 'GENERATE_DEST_REQUEST'
|}

export function generateDestRequest(): GenerateDestRequest {
  return { type: 'GENERATE_DEST_REQUEST' };
}

type GenerateDestError = {|
  type: 'GENERATE_DEST_ERROR',
  error: true,
  payload: Error
|};

export function generateDestError(error: Error): GenerateDestError {
  return { type: 'GENERATE_DEST_ERROR', payload: error, error: true };
}

type GenerateDestSuccess = {|
  +type: 'GENERATE_DEST_SUCCESS',
  +payload: DestsListResponse
|}

export function generateDestSuccess(resp: DestsListResponse): GenerateDestSuccess {
  return { type: 'GENERATE_DEST_SUCCESS', payload: resp };
}

export function generateDest(): ThunkAction {
  return async (dispatch, getState, {
      analytics,
      api,
      geo
    }) => {
    try {
      await dispatch(generateDestRequest());

      analytics.logEvent('generate_dest');

      const {latitude, longitude} = await geo.getPosition();

      const resp = await api.generateDest(latitude, longitude);

      await dispatch(generateDestSuccess(resp));
    } catch (error) {
      await dispatch(generateDestError(error));
      return;
    }
  }
}
