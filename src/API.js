// @flow

import uuidv4 from 'uuid/v4';

opaque type DestID = string;
export type {DestID};

export const USER_ME: UserID = 'me';
opaque type UserID = string;
export type {UserID};

export type Dest = {|
  +id: DestID,
  +userID: UserID,
  +eventID: EventID,
  event?: Event,
  +status: string,
  +feedback: string,
  +createdAt: string,
|};

opaque type EventID = string;
export type {EventID};

export type Event = {|
  +id: EventID,
  +name: string,
  +description: string,
  +latitude: number,
  +longitude: number,
  +start_time: string,
  +end_time: string,
  +is_canceled: boolean,
  +is_bad: boolean,
  +cover: string,
  +place: string,
  +address: string
|};

export type DestGenerateResult = 'ok' | 'wait' | 'error' | 'no-results';

export type DestsListResponse = {|
  +dests: Array<Dest>,
  +events: Array<Event>,
  +result: DestGenerateResult
|};

export type LoginRequest = {|
    // A full oauth token from a mobile login
  token?: string,
    // An intermediate oauth code from web login
  code?: string
|};

export type DestUpdate = {|
  feedback?: string,
  status?: string
|};

export type UserUpdate = {|
  facebookID?: string,
  facebookToken: string,
  mask: string,
|}
export type User = {
  id: UserID,
  facebookID?: string,
  facebookToken: string,
};

export type FetchEventsRequest = Array<string> ;

export const FAKE_USER: User = {
  id: 'fake-user',
  facebookID: 'fake-id',
  facebookToken: 'fake-token'
};
export const FAKE_EVENT: Event = {
  id: 'fake-event',
  name: 'Fake Event',
  description: 'Such a fake event',
  latitude: 0,
  longitude: 0,
  start_time: '2018-01-01',
  end_time: '2018-01-02',
  is_canceled: true,
  is_bad: true,
  cover: 'https://cover.example.com',
  place: 'Fake Place',
  address: '123 Fake St'
};
export const FAKE_DEST: Dest = {
  id: 'fake-dest',
  userID: FAKE_USER.id,
  eventID: FAKE_EVENT.id,
  status: 'going',
  feedback: '',
  createdAt: '2018-01-01',
};

export interface API {
  updateUser(userID: UserID, updates: UserUpdate): Promise<User>;
  generateDest(lat: number, lng: number): Promise<DestsListResponse>;
  updateDest(id: DestID, updates: DestUpdate): Promise<Dest>;
  getDests(): Promise<Array<Dest>>;
  setJWTFunc(jwt: () => Promise<?string>): void;
}

export default class FetchAPI implements API {

  baseURL: string;
  jwtFunc: () => Promise<?string> = async () => null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  setJWTFunc(jwtFunc: () => Promise<?string>): void {
    this.jwtFunc = jwtFunc;
  }

  updateUser(userID: UserID, updates: UserUpdate): Promise<User> {
    return this._do(`/users/${userID}`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    });
  }

  generateDest(lat: number, lng: number) {
    return this._do(`/dests/generate`, {
      method: 'POST',
      body: JSON.stringify({lat, lng})
    });
  }

  fetchEvents(params: FetchEventsRequest) {
    return this._do(`/events/search`, {
      method: 'POST',
      body: JSON.stringify(params)
    });
  }

  updateDest(id: DestID, updates: DestUpdate) {
    return this._do(`/dests/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    });
  }

  getDests(): Promise<Array<Dest>> {
    return this._do(`/dests`);
  }

  async _do(path: string, opts: ?{[string]: any}): Promise<any> {
    opts = opts || { };
    opts.headers = opts.headers || { };

    const jwt = await this.jwtFunc();
    if (jwt) {
      opts.headers['Authorization'] = 'Bearer ' + jwt;
    }

    const requestID: string = uuidv4();
    opts.headers['X-Request-ID'] = requestID;

    const url = this.baseURL + path;
    const method = opts.method || 'GET';

    const resp = await fetch(url, opts);
    if (resp.status !== 200) {
      const body = await resp.text();
      var err = new APIError(body, method, url, resp.status, requestID);
      throw err;
    }

    return resp.json();
  }
}

class APIError extends Error {
  method: string;
  url: string;
  status: number;
  requestID: string;

  constructor(message: string, method: string, url: string, status: number, requestID: string) {
    super(`${method} ${url}: status ${status}, ${message}')`);
    this.status = status;
    this.url = url;
    this.method = method;
    this.requestID = requestID;
  }
}
