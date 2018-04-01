// @flow

import { PermissionsAndroid, Platform } from "react-native";

export type Location = {
  +latitude: number,
  +longitude: number
}

export type LocationCallback = (loc: Location) => void

export interface Geolocation {
  requestPermissions(): Promise<void>;
  getPosition(): Promise<Location>;
  subscribe(callback: LocationCallback): void;
}

export default class GeolocationImpl implements Geolocation {

  callbacks = []
  inited = false

  _notify(coords: Location) {
    this.callbacks.forEach((c) => c(coords));
  }

  _init() {
    if (this.inited) {
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (event) => this._notify(event.coords),
      () => console.warn('fail'));
    navigator.geolocation.watchPosition(
      (event) => this._notify(event.coords),
      () => console.warn('fail'), {
        useSignificantChanges: true,
        enableHighAccuracy: false,
        maximumAge: 5 * 60 * 1000,
        timeout: 60 * 1000
      });
  }

  async requestPermissions() {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request("android.permission.ACCESS_FINE_LOCATION");
      return;
    } else {
      // $FlowFixMe
      navigator.geolocation.requestAuthorization();
    }

    this._init();
  }

  getPosition(): Promise<Location> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({coords}) => resolve({
          latitude: coords.latitude,
          longitude: coords.longitude
        }),
        reject);
    });
  }

  subscribe(callback: LocationCallback) {
    this.callbacks.push(callback);

    navigator.geolocation.getCurrentPosition(
      (event) => this._notify(event.coords),
      () => console.warn('fail'));
  }

}
